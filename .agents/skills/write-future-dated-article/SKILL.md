---
name: write-future-dated-article
description: Writes a future-dated blog post describing a project or app from its website and GitHub repository URLs, incrementing the date from the most recent future-dated article in the repository.
---

# Write Future-Dated Project Article Skill

This skill automates writing a high-quality, future-dated blog article describing a project or application based on a project website URL, a GitHub repository URL, and any specific process/hint inputs.

## Prerequisites

- The helper script [next_post_helper.py](file:///Volumes/Photos/Websites/hellotham-website/.agents/skills/write-future-dated-article/scripts/next_post_helper.py) must be executed to calculate the next target future date.

## Workflow

### 1. Calculate Target Date

Run the helper script to calculate the next release date (it finds the maximum publish date of all blog posts, and if it's in the future, increments it by 7 days; otherwise, it defaults to the next Monday):

```bash
python3 /Volumes/Photos/Websites/hellotham-website/.agents/skills/write-future-dated-article/scripts/next_post_helper.py
```

This returns:

- `DATE` (format: `YYYY-MM-DD`)
- `ISO` (format: `YYYY-MM-DDT00:00:00.000Z`)

### 2. Gather Project Context

Use URL reading tools to collect information about the project:

- **Project/App Website:** Fetch the home page to understand the user-facing description, value proposition, and key features.
- **GitHub Repository:** Fetch the `README.md` or home page to determine the technology stack (languages, frameworks, dependencies) and installation steps.
- **User Hints:** Read any user-provided hints or design process details.

### 3. Write the Post

Create a new Markdown file inside `src/content/blog/` using the format `YYYY-MM-DD-[project-slug].md`.
Ensure the frontmatter contains:

```yaml
title: [Compelling title for the project]
description: [Short, scannable overview of the project and its features]
author: chris-tham
publishDate: [ISO date from Step 1]
featuredpost: false
coverImage: ../../assets/site/screenshot.png
tags:
  - [Tag 1]
  - [Tag 2]
```

### 4. Structuring the Content

Structure the article sections as follows:

- **Overview:** What the project is and what problem it solves.
- **Key Features:** Bullet points highlighting the main capabilities.
- **Technology Stack:** List of frameworks, libraries, and tools used.
- **Process of Building It:** Detail the development process, challenges overcome, and design decisions (incorporate any user-provided hints here).

### 5. Format & Verify

- Format the new post: `pnpm run lint`
- Verify the site compiles correctly with the new post: `pnpm run check` and `pnpm run build`
