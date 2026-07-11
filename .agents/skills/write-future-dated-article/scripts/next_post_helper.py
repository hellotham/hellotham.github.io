import os
import re
from datetime import datetime, timedelta

blog_dir = "/Volumes/Photos/Websites/hellotham-website/src/content/blog"

def get_next_date():
    today = datetime.now()
    
    # Default fallback: next Monday
    days_ahead = 0 - today.weekday()
    if days_ahead <= 0:
        days_ahead += 7
    next_date = today + timedelta(days=days_ahead)
    
    if not os.path.exists(blog_dir):
        return next_date.strftime("%Y-%m-%d"), next_date.strftime("%Y-%m-%dT00:00:00.000Z")
        
    date_pattern = re.compile(r"^(\d{4})-(\d{2})-(\d{2})-")
    max_date = None
    
    for filename in os.listdir(blog_dir):
        match = date_pattern.match(filename)
        if match:
            try:
                post_date = datetime.strptime(match.group(1) + "-" + match.group(2) + "-" + match.group(3), "%Y-%m-%d")
                if max_date is None or post_date > max_date:
                    max_date = post_date
            except ValueError:
                continue
                
    if max_date:
        # If the latest post is in the future relative to today, increment it by 7 days
        if max_date > today:
            next_date = max_date + timedelta(days=7)
        else:
            # If all posts are in the past, use the next Monday
            pass
            
    return next_date.strftime("%Y-%m-%d"), next_date.strftime("%Y-%m-%dT00:00:00.000Z")

if __name__ == "__main__":
    date_str, iso_str = get_next_date()
    print(f"DATE={date_str}")
    print(f"ISO={iso_str}")
