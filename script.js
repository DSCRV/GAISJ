document.addEventListener('DOMContentLoaded', function () {
    fetch('GenAI_Day1.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const tableBody = document.querySelector('#leaderboard tbody');

            // Create an array to store leaderboard data objects
            const leaderboardData = [];

            for (let i = 1; i < rows.length; i++) {
                const rowData = rows[i].split(',');
                console.log(rowData.length)
                if (rowData.length === 9) {
                    console.log(rowData)
                    const [nameWithQuotes, email, profile, status, prompt_design, gemini_and_streamlit, genAIGames, allPathways, redemptionStatus] = rowData;
                    if (status !== 'All Good') continue; // Skip if the student is not enrolled
                    console.log(nameWithQuotes, email, profile, status, parseInt(prompt_design), gemini_and_streamlit, genAIGames, allPathways, redemptionStatus)
                    // Remove double quotes from the name
                    const name = nameWithQuotes.replace(/"/g, '');

                    // Convert redemption status to lowercase and remove whitespace
                    const cleanedRedemptionStatus = redemptionStatus.toLowerCase().replace(/\s/g, '');

                    const cleanedAllPathways = allPathways.toLowerCase().replace(/\s/g, '');

                    // Calculate rank based on the number of courses completed
                    leaderboardData.push({
                        rank: parseInt(prompt_design) + parseInt(gemini_and_streamlit) + parseInt(genAIGames),
                        name,
                        prompt_design: parseInt(prompt_design),
                        gemini_and_streamlit: parseInt(gemini_and_streamlit),
                        genAIGames: parseInt(genAIGames),
                        redemptionStatus: cleanedRedemptionStatus === 'yes' ? '<span class="green-tick">&#10004;</span>' : '<span class="red-cross">&#10008;</span>',
                        allPathways: cleanedAllPathways === 'yes' ? '<span class="green-tick">&#10004;</span>' : '<span class="red-cross">&#10008;</span>',
                    });
                }
            }

            // Sort leaderboard data by rank (number of courses completed)
            leaderboardData.sort((a, b) => b.rank - a.rank);

            // Populate the leaderboard table
            leaderboardData.forEach((data, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${data.name}</td>
                    <td>${data.redemptionStatus}</td>
                    <td>${data.prompt_design}</td>
                    <td>${data.gemini_and_streamlit}</td>
                    <td>${data.genAIGames}</td>
                    <td>${data.allPathways}</td>
                    
                `;
                tableBody.appendChild(row);
            });

            // Search functionality
            const searchInput = document.querySelector('#search');
            searchInput.addEventListener('input', function () {
                const searchQuery = searchInput.value.toLowerCase();
                const filteredData = leaderboardData.filter(data => data.name.toLowerCase().includes(searchQuery));
                renderTable(filteredData);
            });

            // Initial rendering of the full leaderboard
            renderTable(leaderboardData);

            // Function to render the table based on data
            function renderTable(data) {
                tableBody.innerHTML = '';
                data.forEach((data, index) => {
                    if (data.prompt_design + data.gemini_and_streamlit + data.genAIGames == 3){
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><img src="badge.png" width=20px></td>
                        <td>${data.name}</td>
                        <td>${data.redemptionStatus}</td>
                        <td>${data.prompt_design}</td>
                        <td>${data.gemini_and_streamlit}</td>
                        <td>${data.genAIGames}</td>
                        
                    `;
                    tableBody.appendChild(row);
                    }
                    else {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${index + 1}</td>
                            <td>${data.name}</td>
                            <td>${data.redemptionStatus}</td>
                            <td>${data.prompt_design}</td>
                            <td>${data.gemini_and_streamlit}</td>
                            <td>${data.genAIGames}</td>
                            
                        `;
                        tableBody.appendChild(row);
                    }
                });
            }
        })
        .catch(error => console.error('Error:', error));
});