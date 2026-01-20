document.addEventListener('DOMContentLoaded', () => {
    const habitInput = document.getElementById('habit-input');
    const addHabitBtn = document.getElementById('add-habit');
    const habitList = document.getElementById('habit-list');

    // Load habits from localStorage
    let habits = JSON.parse(localStorage.getItem('habits')) || [];

    function renderHabits() {
        habitList.innerHTML = '';
        habits.forEach((habit, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${habit.name}</span>
                <div>
                    <input type="checkbox" ${habit.completed ? 'checked' : ''} data-index="${index}">
                    <span class="streak">Streak: ${habit.streak}</span>
                    <button class="delete" data-index="${index}">Delete</button>
                </div>
            `;
            habitList.appendChild(li);
        });
    }

    function saveHabits() {
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    addHabitBtn.addEventListener('click', () => {
        const habitName = habitInput.value.trim();
        if (habitName) {
            habits.push({ name: habitName, completed: false, streak: 0 });
            habitInput.value = '';
            saveHabits();
            renderHabits();
        }
    });

    habitList.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const index = e.target.dataset.index;
            habits[index].completed = e.target.checked;
            if (habits[index].completed) {
                habits[index].streak++;
            } else {
                habits[index].streak = Math.max(0, habits[index].streak - 1);
            }
            saveHabits();
            renderHabits();
        }
    });

    habitList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.dataset.index;
            habits.splice(index, 1);
            saveHabits();
            renderHabits();
        }
    });

    renderHabits();
});
