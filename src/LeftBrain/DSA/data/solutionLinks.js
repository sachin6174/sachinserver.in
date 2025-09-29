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
    },
    'Rotate Array': {
        videoUrl: 'https://www.youtube.com/watch?v=8RErc0VXAo8',
        description: 'In-depth explanation of the Rotate Array problem with multiple approaches, including the optimal O(1) space solution using reversals.',
        topics: ['Array', 'Two Pointers'],
        difficulty: 'Medium',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)'
    },
    'Majority Element': {
        videoUrl: 'https://www.youtube.com/watch?v=wD7fs5P_MVo',
        description: 'A clear explanation of the Majority Element problem and the Boyer-Moore Voting Algorithm, the optimal O(n) time and O(1) space solution.',
        topics: ['Array', 'Hashing', 'Divide and Conquer', 'Sorting', 'Counting'],
        difficulty: 'Easy',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)'
    },
    'Best Time to Buy and Sell Stock': {
        videoUrl: [
            'https://www.youtube.com/watch?v=E2-heUEnZKU',
            'https://www.youtube.com/watch?v=4YjEHmw1MX0'
        ],
        description: 'A detailed walkthrough of the "Best Time to Buy and Sell Stock" problem, explaining the one-pass approach for an O(n) time and O(1) space solution.',
        topics: ['Array', 'Dynamic Programming'],
        difficulty: 'Easy',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)'
    },
    'Best Time to Buy and Sell Stock II': {
        videoUrl: 'https://www.youtube.com/watch?v=HWJ9kIPpzXs&list=PL-Jc9J83PIiG8fE6rj9F5a6uyQ5WPdqKy&index=31',
        description: 'A detailed walkthrough of the \'Best Time to Buy and Sell Stock II\' problem, explaining the one-pass approach for an O(n) time and O(1) space solution.',
        topics: ['Array', 'Dynamic Programming', 'Greedy'],
        difficulty: 'Medium',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)'
    },
    'Jump Game': {
        videoUrl: 'https://www.youtube.com/watch?v=Gtugy3mRV-A&t=9s',
        description: 'A detailed walkthrough of the \'Jump Game\' problem, explaining the greedy approach for an O(n) time and O(1) space solution.',
        topics: ['Array', 'Dynamic Programming', 'Greedy'],
        difficulty: 'Medium',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)'
    },
    'Jump Game II': {
        videoUrl: 'https://www.youtube.com/watch?v=9kyHYVxL4fw&t=998s',
        description: 'A detailed walkthrough of the \'Jump Game II\' problem, explaining the greedy approach for an O(n) time and O(1) space solution.',
        topics: ['Array', 'Dynamic Programming', 'Greedy'],
        difficulty: 'Medium',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)'
    },
    
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