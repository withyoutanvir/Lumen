
import Notification from '../models/Notification.js';
import User from '../models/usermodel.js';

// Example: Send a notification to all users every day at midnight
export async function sendDailyAlert() {
	const users = await User.find();
	const promises = users.map(user => {
		return Notification.create({
			user: user._id,
			title: 'Daily Alert',
			message: 'This is your daily notification!',
			type: 'info'
		});
	});
	await Promise.all(promises);
	console.log('Daily alerts sent to all users');
}

// Example: Schedule with node-cron (add to your server.js if needed)
// import cron from 'node-cron';
// cron.schedule('0 0 * * *', sendDailyAlert); // every day at midnight
