// Solution video links for DSA problems
// Format: 'Problem Title': { videoUrl: 'YouTube URL', description: 'Brief description' }

export const solutionLinks = {
    // Multidimensional DP Problems
    'Triangle': {
        videoUrl: 'https://www.youtube.com/watch?v=9kcZE8esf7Q',
        description: 'Complete explanation of Triangle problem using dynamic programming approach. Covers both top-down and bottom-up solutions with detailed complexity analysis.',
        topics: ['Dynamic Programming', 'Multidimensional DP', 'Array'],
        difficulty: 'Medium',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1) optimized, O(n²) basic'
    }
    
    // Add more solution links here as needed
    // Example format for future additions:
    /*
    'Problem Name': {
        videoUrl: 'https://www.youtube.com/watch?v=VIDEO_ID',
        description: 'Description of the solution approach',
        topics: ['Topic1', 'Topic2'],
        difficulty: 'Easy|Medium|Hard',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)'
    }
    */
};

// Helper function to get YouTube video ID from URL
export const getYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

// Helper function to get YouTube thumbnail URL
export const getYouTubeThumbnail = (videoUrl) => {
    const videoId = getYouTubeVideoId(videoUrl);
    return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
};

// Helper function to check if problem has solution video
export const hasSolutionVideo = (problemTitle) => {
    // Extract just the problem name without difficulty tag
    const cleanTitle = problemTitle.replace(/\s*\[(Easy|Medium|Hard)\]$/, '').trim();
    return cleanTitle in solutionLinks;
};

// Helper function to get solution data for a problem
export const getSolutionData = (problemTitle) => {
    const cleanTitle = problemTitle.replace(/\s*\[(Easy|Medium|Hard)\]$/, '').trim();
    return solutionLinks[cleanTitle] || null;
};