const Task = require('$Models/Task');
const Wallet = require('$Models/Wallet');
const { sendEvent } = require('$Modules/MB');

module.exports = async data => {
	const { id: taskID, description, assignee_id: assigneeID } = data;

	const task = await Task.findOne({_id: taskID});

	if(!task){
		throw new Error(`Task ${taskID} not found`);
	}

	let wallet = await Wallet.findOne({employee_id: assigneeID});
	if(!wallet){
		throw new Error(`Wallet for user ${assigneeID} not found`);
	}

	wallet.sum += task.reward;
	await wallet.save();

	await sendEvent('payments', 'WalletCharged', {
		employee_id: assigneeID,
		total: task.reward,
		description: `Задача ${task._id} выполнена сотрудником ${assigneeID}, будет начислено ${task.reward} деняк`,
		task_description: description,
	});
}
