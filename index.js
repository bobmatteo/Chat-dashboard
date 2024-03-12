// #region Sidebar resize

const chatResizer = document.querySelector('.chats-resizer');
const chatSidebar = document.querySelector('.chats');

const documentsResizer = document.querySelector('.documents-resizer');
const documentsSidebar = document.querySelector('.documents');

chatResizer.addEventListener('mousedown', (event) => {
    event.preventDefault();
    chatResizer.setAttribute("class", "chats-resizer chats-resizer-hover");
    document.addEventListener('mousemove', chatsResize, false);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', chatsResize, false);
        chatResizer.setAttribute("class", "chats-resizer");
    }, false);
});

chatResizer.addEventListener('dblclick', (event) => {
    chatsReset()
});

documentsResizer.addEventListener('mousedown', (event) => {
    event.preventDefault();
    documentsResizer.setAttribute("class", "documents-resizer documents-resizer-hover");
    document.addEventListener('mousemove', documentsResize, false);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', documentsResize, false);
        documentsResizer.setAttribute("class", "documents-resizer");
    }, false);
});

documentsResizer.addEventListener('dblclick', (event) => {
    documentsReset()
});

function chatsResize(e) {
    const size = `${e.x}px`;
    chatSidebar.style.flexBasis = size;
}

function documentsResize(e) {
    const size = `${window.innerWidth - e.x}px`;
    documentsSidebar.style.flexBasis = size;
}

function chatsReset() {
    chatSidebar.style.flexBasis = `350px`;
}

function documentsReset() {
    documentsSidebar.style.flexBasis = `350px`;
}

// #endregion

// #region Dark/Light mode

const darkMode = document.querySelector('.dark-mode');
const lightMode = document.querySelector('.light-mode');
let root = document.documentElement;

darkMode.addEventListener('mousedown', (event) => {
    setDarkMode()
});

lightMode.addEventListener('mousedown', (event) => {
    setLightMode()
});

function setDarkMode() {
    root.style.setProperty('--primary', '#33AAEE');
    root.style.setProperty('--primary-20', 'rgba(51, 170, 238, 0.2)')
    root.style.setProperty('--background', '#222222');
    root.style.setProperty('--background-highlight', '#444444');
    root.style.setProperty('--background-hover', 'rgba(255, 255, 255, 0.05)');
    root.style.setProperty('--border', 'rgba(255, 255, 255, 0.1)');
    root.style.setProperty('--border-highlight', 'rgba(255, 255, 255, 0.3)');
    root.style.setProperty('--text', '#aaaaaa');
    root.style.setProperty('--text-highlight', '#ffffff');

    Chart.defaults.pointBackgroundColor = '#222222';
    Chart.defaults.color = '#aaaaaa';
    Chart.defaults.plugins.title.color = '#ffffff';
    myChart.options.scales.x.grid.color = 'rgba(255, 255, 255, 0.1)';
    myChart.options.scales.y.grid.color = 'rgba(255, 255, 255, 0.1)';
    myChart.update();
}

function setLightMode() {
    root.style.setProperty('--primary', '#6655DD');
    root.style.setProperty('--primary-20', 'rgba(102, 85, 221, 0.2)')
    root.style.setProperty('--background', '#ffffff');
    root.style.setProperty('--background-highlight', '#ececec');
    root.style.setProperty('--background-hover', 'rgba(0, 0, 0, 0.05)');
    root.style.setProperty('--border', 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--border-highlight', 'rgba(0, 0, 0, 0.3)');
    root.style.setProperty('--text', '#666666');
    root.style.setProperty('--text-highlight', '#000000');

    Chart.defaults.pointBackgroundColor = '#ffffff';
    Chart.defaults.color = '#666666';
    Chart.defaults.plugins.title.color = '#000000';
    myChart.options.scales.x.grid.color = 'rgba(0, 0, 0, 0.1)';
    myChart.options.scales.y.grid.color = 'rgba(0, 0, 0, 0.1)';
    myChart.update();
}

// #endregion

// #region Autocomplete question input

var questions = ["What is lorem ipsum dolor sit amet?", "Why eutem vel eum iure reprehenderit qui in voluptate elit esse quam nihil?", "Why enim ad minim veniam, quis nostrud exercitation?"];

function autocomplete(inp, arr) {

    var currentFocus;

    inp.addEventListener("input", function (e) {

        var a, b, c, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(a);

        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.setAttribute("class", "suggestion");

                c = document.createElement("DIV");
                c.setAttribute("class", "button")

                b.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="CurrentColor" viewBox="0 0 256 256"><path d="M232.49,112.49l-48,48a12,12,0,0,1-17-17L195,116H128a84.09,84.09,0,0,0-84,84,12,12,0,0,1-24,0A108.12,108.12,0,0,1,128,92h67L167.51,64.48a12,12,0,0,1,17-17l48,48A12,12,0,0,1,232.49,112.49Z"></path></svg>';

                c.innerHTML += "<span>" + arr[i].substr(0, val.length) + "</span>";
                c.innerHTML += arr[i].substr(val.length);
                c.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                c.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });

                b.appendChild(c);
                a.appendChild(b);
                a.setAttribute("style", "padding: 14px 14px 0 14px;")
            }
        }
    });

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("questionInput"), questions);

const mainInput = document.querySelector('.input');
const mainInputShortcut = document.querySelector('.input-buttons .shortcut');
const mainInputRemoveIcon = document.querySelector('.input-buttons .remove-icon');

function hideShortcut() {
    mainInputShortcut.style.setProperty('display', 'none');
};
function showShortcut() {
    mainInputShortcut.style.setProperty('display', 'flex');
};

mainInput.addEventListener('input', (event) => {
    if (mainInput.value.length > 0) {
        mainInputRemoveIcon.style.setProperty('display', 'block');
        mainInputShortcut.classList.add('hidden');
    } else {
        mainInputRemoveIcon.style.setProperty('display', 'none');
        mainInputShortcut.classList.remove('hidden');
    }
});

mainInputRemoveIcon.addEventListener('click', (event) => {
    mainInput.value = '';
    mainInputRemoveIcon.style.setProperty('display', 'none');
    mainInputShortcut.classList.remove('hidden');
    mainInput.focus();
});

// #endregion

// #region Chart

var chart = document.getElementById('chart').getContext('2d');

var gradient = chart.createLinearGradient(0, 0, 0, 450);

gradient.addColorStop(0, 'rgba(187, 34, 136, 0.1)');
gradient.addColorStop(0.7, 'rgba(187, 34, 136, 0)');

var gradient2 = chart.createLinearGradient(0, 0, 0, 450);

gradient2.addColorStop(0, 'rgba(51, 170, 238, 0.1)');
gradient2.addColorStop(0.7, 'rgba(51, 170, 238, 0)');

var data = {
    labels: ['Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
    datasets: [{
        label: 'Duration',
        backgroundColor: gradient,
        fill: true,
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 4,
        borderWidth: 2,
        pointHoverBorderWidth: 2,
        borderColor: '#BB2288',
        data: [330, 100, 160, 340, 310]
    },
    {
        label: 'Event',
        backgroundColor: gradient2,
        fill: true,
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 4,
        borderWidth: 2,
        pointHoverBorderWidth: 2,
        borderColor: '#33AAEE',
        data: [290, 140, 120, 310, 330]
    }]
};

var options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 0,
    },
    scales: {
        x: {
            grid: {
                lineWidth: 1,
                drawTicks: false
            },
            ticks: {
                stepSize: 100,
                max: 400,
                padding: 20,
                align: 'far'
            },
            border: {
                display: false
            }
        },
        xTopPadding: {
            position: 'top',
            labels: [''],
            grid: {
                drawOnChartArea: false,
                drawTicks: false
            },
            border: {
                display: false
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                lineWidth: 1,
                drawTicks: false
            },
            ticks: {
                stepSize: 100,
                max: 400,
                padding: 10,
                crossAlign: 'far'
            },
            border: {
                display: false
            }
        }
    },
    elements: {
        line: {
            tension: 0,
        }
    },
    plugins: {
        title: {
            display: true,
            text: 'Total hours & Lessons conducted',
            align: 'start',
            font: {
                weight: 400
            },
            padding: {
                bottom: 12
            }
        },
        legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                boxHeight: 8,
                padding: 0
            }
        },
        tooltip: {
            displayColors: false
        }
    }
};

Chart.defaults.font.family = 'Inter';
Chart.defaults.font.size = 14;
Chart.defaults.font.weight = 400;

var myChart = new Chart(chart, {
    type: 'line',
    data: data,
    options: options
});

// #endregion

// #region Scroll main section to bottom

var chatContainer = document.querySelector(".chat-container");
chatContainer.scrollTop = chatContainer.scrollHeight;

// #endregion

// #region Show modals

const addModal = document.querySelector('.add-modal');
const closeAddModal = document.querySelector('.add-modal .close-modal');
const openModal = document.querySelector('.upgrade');
const backdrop = document.querySelector('dialog::backdrop');

closeAddModal.addEventListener('click', (event) => {
    addModal.close();
});

openModal.addEventListener('click', (event) => {
    addModal.showModal();
});

function onClick(event) {
    if (event.target === mainSearchModal) {
        closeSearchModal();
    }
}

const searchInput = document.querySelector('.search');
const mainSearchModal = document.querySelector('.main-search-modal');
const closeMainSearchModal = document.querySelector('.main-search-modal .close-modal');

mainSearchModal.addEventListener("click", onClick);

closeMainSearchModal.addEventListener('click', (event) => {
    closeSearchModal();
});

function closeSearchModal() {
    mainSearchModal.close();
    searchInput.value = '';
};

// #endregion

// #region Add chat button

const addChatButton = document.querySelector('.add-chat-button');
const addChatInputContainer = document.querySelector('.add-chat-container');
const addChatInput = document.querySelector('.add-chat');
const addChatInputRemoveIcon = document.querySelector('.add-chat-container .remove-icon');
const selectedItems = document.querySelectorAll('.chats input[type="radio"]');

addChatButton.addEventListener('click', (event) => {
    addChatInputContainer.style.setProperty('display', 'flex');
    addChatInput.focus();
    for (let item of selectedItems) {
        item.checked = false;
    };
});

function hideAddChat() {
    if (addChatInput.value.length == 0) {
        addChatInputContainer.style.setProperty('display', 'none');
    }
};

addChatInput.addEventListener('input', (event) => {
    if (addChatInput.value.length > 0) {
        addChatInputRemoveIcon.style.setProperty('display', 'block');
    } else {
        addChatInputRemoveIcon.style.setProperty('display', 'none');
    }
});

addChatInputRemoveIcon.addEventListener('click', (event) => {
    addChatInput.value = '';
    addChatInputRemoveIcon.style.setProperty('display', 'none');
    addChatInput.focus();
});

// #endregion

// #region Shortcuts

document.addEventListener('keydown', function (event) {
    if (event.metaKey && event.code === 'KeyK') {
        event.preventDefault();
        mainSearchModal.showModal();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.metaKey && event.code === 'KeyN') {
        event.preventDefault();
        addChatInputContainer.style.setProperty('display', 'flex');
        addChatInput.focus();
        for (let item of selectedItems) {
            item.checked = false;
        };
    }
});

document.addEventListener('keydown', function (event) {
    if (event.metaKey && event.code === 'KeyB') {
        event.preventDefault();
        mainInput.focus();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.code === 'Escape') {
        event.preventDefault();
        addModal.close();
        closeSearchModal();
        addChatInput.blur();
        mainInput.blur();
    }
});

// #endregion