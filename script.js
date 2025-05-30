async function fetchMatches() {
const matchesContainer = document.getElementById('matches');
const loadingElem = document.getElementById('loading');

try {
    const response = await fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=133602');
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    const data = await response.json();

    loadingElem.style.display = 'none';

    if (!data.events || data.events.length === 0) {
    matchesContainer.innerHTML = '<p>No upcoming matches found.</p>';
    return;
    }

    // Sort events by date/time ascending
    const sortedEvents = data.events.slice().sort((a, b) => new Date(a.dateEvent + 'T' + a.strTime) - new Date(b.dateEvent + 'T' + b.strTime));

    sortedEvents.forEach(event => {
    const matchDiv = document.createElement('div');
    matchDiv.className = 'match';

    const teamsDiv = document.createElement('div');
    teamsDiv.className = 'teams';
    teamsDiv.textContent = `${event.strHomeTeam}  vs  ${event.strAwayTeam}`;

    const dateTimeDiv = document.createElement('div');
    dateTimeDiv.className = 'datetime';
    // Format datetime nicely
    const dateTime = new Date(event.dateEvent + 'T' + (event.strTime || '00:00:00') + 'Z');
    // Convert to user local time zone string, short date and time
    const localeString = dateTime.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    dateTimeDiv.textContent = localeString;

    matchDiv.appendChild(teamsDiv);
    matchDiv.appendChild(dateTimeDiv);
    matchesContainer.appendChild(matchDiv);
    });

} catch (error) {
    loadingElem.style.display = 'none';
    matchesContainer.innerHTML = `<div id="error">Failed to load matches. Please try again later.</div>`;
    console.error('Failed fetching matches:', error);
}
}

fetchMatches();


