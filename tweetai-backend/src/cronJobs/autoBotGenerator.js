const axios = require('axios');
const cron = require('node-cron');
const { Autobot, Post, Comment } = require('../../models');

// Function to create Autobots, Posts, and Comments
async function createAutobots() {
    try {
        console.log('Starting the creation of 500 Autobots...');

        // Fetch all available users once
        const { data: autobotData } = await axios.get('https://jsonplaceholder.typicode.com/users');

        for (let i = 0; i < 500; i++) {
            const userIndex = i % autobotData.length; // Cycle through available users
            const autobot = await Autobot.create({
                name: autobotData[userIndex].name,
                username: autobotData[userIndex].username,
                email: autobotData[userIndex].email,
            });

            // Fetch and use posts from a fixed range
            for (let j = 0; j < 10; j++) {
                // Ensure the post ID is within a valid range (1 to 100)
                const postId = (j % 100) + 1;
                const { data: postData } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);

                const post = await Post.create({
                    title: `${postData.title} ${autobot.id}`, // Ensure unique titles
                    body: postData.body,
                    autobotId: autobot.id,
                });

                // Fetch comments for each post
                const { data: commentsData } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
                for (let k = 0; k < 10; k++) {
                    if (k < commentsData.length) {
                        await Comment.create({
                            name: commentsData[k].name,
                            email: commentsData[k].email,
                            body: commentsData[k].body,
                            postId: post.id,
                        });
                    }
                }
            }
        }

        console.log('500 Autobots created successfully');
    } catch (error) {
        console.error('Error creating Autobots:', error);
    }
}

// Schedule the task to run every minute (for testing)
// cron.schedule('*/1 * * * *', createAutobots);
// Schedule the task to run every hour
cron.schedule('0 * * * *', createAutobots);

