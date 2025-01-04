
async function sendRequest(url) {
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            console.log("Request sent successfully at", new Date().toLocaleString());
        } else {
            console.log("Failed to send request. Status code:", response.status);
        }
    } catch (error) {
        console.log("An error occurred:", error.message);
    }
}

async function main() {
    const open_table_url = "https://opent-table.onrender.com/restaurants"  
    const kanban_url = "https://task-management-app-nauz.onrender.com"
    while (true) {
        await sendRequest(open_table_url);
        await sendRequest(kanban_url);
        await new Promise(resolve => setTimeout(resolve, 13 * 60 * 1000)); // Sleep for 13 minutes
    }
}

//main();

module.exports = main