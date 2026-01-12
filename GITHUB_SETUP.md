# GitHub Contribution Graph Setup Guide

## Overview

Your GitHub contribution graph component now uses **GitHub's official GraphQL API** as recommended in the article. This provides accurate, real-time contribution data directly from GitHub.

## Current Status

✅ **Code Updated**: The component now uses the proper GraphQL query structure  
⚠️ **Token Required**: You need to configure a GitHub Personal Access Token

## Why You're Seeing the Image Fallback

Right now, you're seeing a static image from `ghchart.rshah.org` because the GitHub token isn't configured. Once you add your token, you'll see an interactive contribution graph with:

- Exact contribution counts on hover
- Proper color-coded activity levels
- Month and day labels
- Total contribution count

## Setup Instructions

### Step 1: Generate a GitHub Personal Access Token

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a descriptive name (e.g., "Portfolio Website")
4. Set expiration (recommended: 90 days or No expiration for personal projects)
5. **Select only this scope:**
   - ✅ `read:user` (Read user profile data)
6. Click **"Generate token"** at the bottom
7. **Copy the token immediately** (you won't be able to see it again!)

### Step 2: Add Token to Your Project

Create a `.env` file in your project root:

```bash
# In /Users/sachinkumar/Desktop/sachinserver.in/
touch .env
```

Add this line to the `.env` file:

```env
REACT_APP_GITHUB_TOKEN=your_token_here
```

Replace `your_token_here` with the token you copied from GitHub.

### Step 3: Add .env to .gitignore

**IMPORTANT**: Never commit your `.env` file to version control!

Check if `.env` is in your `.gitignore`:

```bash
# Add this line to .gitignore if not already present
.env
```

### Step 4: Restart Your Development Server

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it
npm start
# or
npm run dev
```

## How It Works

The component uses this GraphQL query (from the article):

```graphql
query($userName: String!) { 
  user(login: $userName) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
```

This fetches:
- Total contributions for the year
- Weekly breakdown of contribution days
- Individual contribution counts per day
- Exact dates for each contribution

## Troubleshooting

### "Configure GitHub token for interactive graph" message
- Your `.env` file is missing or the token isn't set
- Make sure the variable is named exactly `REACT_APP_GITHUB_TOKEN`
- Restart your dev server after creating/updating `.env`

### "API unavailable" or error messages
- Check that your token has the `read:user` scope
- Verify the token hasn't expired
- Check browser console for detailed error messages

### Still seeing the image fallback
- Confirm `.env` is in the project root (same level as `package.json`)
- Verify the token is valid by testing it in [GitHub GraphiQL Explorer](https://docs.github.com/en/graphql/overview/explorer)
- Clear your browser cache and hard refresh (Cmd+Shift+R)

## Security Notes

✅ **Safe for client-side use**: The `read:user` scope only allows reading public profile data  
✅ **No write access**: This token cannot modify your GitHub account  
⚠️ **Keep it private**: Don't share your token or commit it to git  
⚠️ **Rotate regularly**: Consider regenerating tokens periodically

## What Changed

The component was updated from using a third-party API (`github-contributions-api.jogruber.de`) to GitHub's official GraphQL API. This provides:

- ✅ More reliable data (directly from GitHub)
- ✅ Real-time updates
- ✅ Better error handling
- ✅ Official API support

## Next Steps

1. Generate your GitHub token
2. Add it to `.env`
3. Restart your dev server
4. Refresh your browser to see the interactive graph!

---

**Need help?** Check the [GitHub GraphQL API documentation](https://docs.github.com/en/graphql) or the original [article](https://medium.com/@yuichkun/how-to-retrieve-contribution-graph-data-from-the-github-api-dc3a151b4af)
