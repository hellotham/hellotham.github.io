---
draft: false
title: 'Financial Analysis and Portfolio Optimisation (Part 2): Engineering Challenges'
description: 'Practical engineering challenges of building a portfolio optimiser: importing data from multiple brokerages, retrieving clean price feeds, and navigating deprecated quantitative libraries.'
author: chris-tham
publishDate: 2026-07-22T00:00:00.000Z
featuredpost: false
coverImage: ../../assets/blog/20141020-DSC07931-Edit.jpg
tags:
  - Finance
  - Portfolio Optimisation
  - Python
  - PyPortfolioOpt
  - yfinance
---

In [Part 1](/blog/2026-07-20-python-finance-1-intro/) of this series, we explored the mathematical foundations of Harry Markowitz's Modern Portfolio Theory (MPT) and how the Efficient Frontier behaves in theory.

However, translating textbook mathematics into a working, real-world portfolio optimiser introduces several distinct software engineering challenges. When I set out to build a custom portfolio rebalancer in a Jupyter Notebook, I ran into hurdles ranging from fragmented data sources and unreliable price feeds to deprecated quantitative libraries.

Here is how I tackled these practical engineering challenges.

---

## Challenge 1: Fragmented Transaction History (CommSec, GnuCash, & More)

The first step in analysing any investment portfolio is determining your current holdings and transaction history. Real-world portfolio data is rarely clean or centralized; instead, it is often scattered across:

- Brokerage account statements and trade confirmation PDFs.
- CSV transaction exports from retail brokerages (like **CommSec**).
- Double-entry personal accounting databases (such as **GnuCash**).

To build a consolidated history, I created a Python pipeline to parse, clean, and align these disparate sources:

```python
import pandas as pd

def parse_commsec_csv(filepath):
    # CommSec exports have specific headers and metadata rows that need skipping
    df = pd.read_csv(filepath, skiprows=2)
    df['Date'] = pd.to_datetime(df['Transaction Date'], format='%d/%m/%Y')
    # Filter buys and sells
    df['Units'] = df['Quantity'] * df['Transaction Type'].apply(lambda x: 1 if x == 'Buy' else -1)
    return df[['Date', 'Security Code', 'Units', 'Net Code/Value']]
```

### Corporate Actions

Handling historical adjustments is one of the most complex tasks. Share splits, consolidations, mergers, spin-offs, and dividend reinvestment plans (DRPs) mean that simply adding up historical transaction quantities will not yield your true current holdings. I had to build custom alignment tables to apply split-adjustment factors retroactively based on the announcement dates.

---

## Challenge 2: Sourcing Reliable Historical Price Feeds

Once you have your transaction ledger, you need daily adjusted closing prices for all assets to compute historical returns and covariance matrices.

I evaluated multiple premium financial APIs, but settled on **`yfinance`** as the most accessible and reliable tool for personal development. However, working with it presented its own set of nuances:

1.  **Ticker Symbol Formatting:** Australian Securities Exchange (ASX) tickers must be formatted with the `.AX` suffix (e.g., `CBA.AX` for Commonwealth Bank of Australia, `VAS.AX` for Vanguard Australian Shares Index ETF).
2.  **Adjusted Prices:** To calculate true total returns, it is critical to use the `Adj Close` price rather than the raw `Close` price, as the adjusted price accounts for dividends, distributions, and stock splits.
3.  **Data Gaps:** Occasional missing daily prices (due to trading halts or public holiday discrepancies across global exchanges) had to be cleaned using forward-filling (`df.ffill()`) to avoid NaN propagation in the covariance calculations.

```python
import yfinance as yf

# Retrieve adjusted close prices for ASX tickers
tickers = ['VAS.AX', 'VGS.AX', 'CBA.AX', 'BHP.AX']
price_data = yf.download(tickers, start="2018-01-01", end="2026-01-01")['Adj Close']

# Forward-fill any missing dates (holidays, trading halts)
price_data = price_data.ffill().dropna()
```

---

## Challenge 3: Navigating the Broken Quantopian Legacy

To analyze portfolio risk metrics (such as drawdown, alpha, beta, and information ratio), the industry-standard libraries built by Quantopian were:

- **`empyrical`**: Calculates financial risk and performance metrics.
- **`alphalens`**: Analyzes the performance of predictive alpha factors.
- **`pyfolio`**: Generates comprehensive performance "tearsheets."

However, because Quantopian shut down in November 2020, these repositories were abandoned. When I attempted to install the original libraries in a modern Python 3 environment, they failed immediately. They were heavily dependent on legacy versions of `pandas` and `numpy`. Specifically, functions like `pandas.util.testing` had been removed, and changes to the pandas `Index` and `MultiIndex` classes broke the internal metrics calculation engines.

### The Solution: The "Reloaded" Packages

Fortunately, the quantitative finance community stepped in to maintain these packages. Stefan Jansen and other contributors created the **reloaded** forks, updating the internal codebase to maintain compatibility with modern data science tools:

- **`empyrical-reloaded`** (supports pandas `>=1.3.0`)
- **`alphalens-reloaded`** (supports pandas `>=1.5.0` and `<3.0`)
- **`pyfolio-reloaded`** (replaces deprecated pandas testing utilities)

These reloaded libraries are essential for any modern quantitative finance notebook. Note that if you run a modern environment with **NumPy 2.0+**, you must ensure your pandas dependency is pinned to at least **2.2.2** to prevent runtime compilation errors between the reloaded modules and NumPy's new C-API layer.

---

## Challenge 4: Mean-Variance Optimization with PyPortfolioOpt

With clean transaction ledger balances and price feeds, I used **`PyPortfolioOpt`** to solve the actual portfolio weights allocation.

`PyPortfolioOpt` is an exceptionally well-engineered library that simplifies mean-variance optimization while addressing the mathematical limitations of basic MPT:

1.  **Covariance Shrinkage:** Calculating a raw sample covariance matrix from historical returns introduces significant noise. `PyPortfolioOpt` provides built-in Ledoit-Wolf shrinkage (`risk_models.CovarianceShrink`):
    ```python
    from pypfolioopt import risk_models
    # Shrinks sample covariance towards a structured estimator to reduce noise
    shrunk_cov = risk_models.CovarianceShrink(price_data).ledoit_wolf()
    ```
2.  **Black-Litterman Model:** Standard MPT optimizations are highly sensitive to historical input returns, often resulting in extreme weight allocations (e.g., putting 99% of your capital into a single asset that performed well historically). `PyPortfolioOpt` supports the Black-Litterman model, allowing you to blend historical market priors with subjective views.
3.  **Objective Customization:** It natively supports custom constraints, such as setting minimum/maximum allocation limits per asset class (e.g. capping equities at 70% and bonds at 30%).

---

## Conclusion

Building a portfolio optimiser requires equal parts financial mathematics and data engineering. Overcoming the challenges of data cleaning, price sourcing, and library maintenance allows us to build a robust model for portfolio management. In the next post, we will build a complete, end-to-end Jupyter Notebook using these tools and perform a real rebalancing exercise on our assets.

---

## References

1. Martin, R. A. (2021). "PyPortfolioOpt: Portfolio Optimization in Python." _Journal of Open Source Software_, 6(61), 3066. [doi:10.21105/joss.03066](https://doi.org/10.21105/joss.03066)
2. Jansen, S. (2020). _Machine Learning for Algorithmic Trading - Second Edition_. Packt Publishing.
3. PyPortfolioOpt Documentation. "Mean-Variance Optimization." [https://pyportfolioopt.readthedocs.io/en/latest/](https://pyportfolioopt.readthedocs.io/en/latest/)
4. GitHub - pyfolio-reloaded. "Community maintained version of pyfolio." [https://github.com/stefan-jansen/pyfolio-reloaded](https://github.com/stefan-jansen/pyfolio-reloaded)
5. GitHub - alphalens-reloaded. "Community maintained version of alphalens." [https://github.com/stefan-jansen/alphalens-reloaded](https://github.com/stefan-jansen/alphalens-reloaded)
