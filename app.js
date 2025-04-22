const foods = [
  { name: "Yumurta", unit: "adet", calPerUnit: 72, carbPerUnit: 0.4, proteinPerUnit: 6, fatPerUnit: 5 },
  { name: "Badem", unit: "gram", calPerUnit: 5.7, carbPerUnit: 0.2, proteinPerUnit: 0.2, fatPerUnit: 0.5 },
  { name: "Zeytin", unit: "adet", calPerUnit: 5, carbPerUnit: 0.1, proteinPerUnit: 0.03, fatPerUnit: 0.4 },
  { name: "Avokado", unit: "gram", calPerUnit: 1.6, carbPerUnit: 0.08, proteinPerUnit: 0.02, fatPerUnit: 0.15 },
  { name: "Hindi Göğüs", unit: "gram", calPerUnit: 1.35, carbPerUnit: 0, proteinPerUnit: 0.29, fatPerUnit: 0.03 },
  { name: "Brokoli", unit: "gram", calPerUnit: 0.34, carbPerUnit: 0.07, proteinPerUnit: 0.03, fatPerUnit: 0.003 },
];

function startMeals() {
  document.getElementById("targetSection").classList.add("hidden");
  document.getElementById("mealSection").classList.remove("hidden");

  const meals = ["Kahvaltı", "Öğle", "Akşam", "Ara Öğün"];
  const container = document.getElementById("mealsContainer");
  meals.forEach(meal => {
    const mealDiv = document.createElement("div");
    mealDiv.innerHTML = `<h3 class="text-xl font-bold text-blue-700 mb-2">${meal}</h3>`;

    for (let i = 0; i < 6; i++) {
      mealDiv.innerHTML += `
        <div class="flex space-x-2 mb-2">
          <select class="flex-1 p-2 border rounded" data-meal="${meal}">
            <option value="">Yiyecek Seç</option>
            ${foods.map(f => `<option value="${f.name}">${f.name}</option>`).join("")}
          </select>
          <input type="number" placeholder="Miktar" class="w-24 p-2 border rounded" data-meal="${meal}">
        </div>
      `;
    }

    container.appendChild(mealDiv);
  });
}

function calculateResults() {
  let totalCalories = 0, totalCarbs = 0, totalProtein = 0, totalFat = 0;

  document.querySelectorAll('#mealsContainer select').forEach((select, index) => {
    const input = document.querySelectorAll('#mealsContainer input')[index];
    const selectedFood = foods.find(f => f.name === select.value);
    if (selectedFood && input.value) {
      const qty = parseFloat(input.value);
      totalCalories += selectedFood.calPerUnit * qty;
      totalCarbs += selectedFood.carbPerUnit * qty;
      totalProtein += selectedFood.proteinPerUnit * qty;
      totalFat += selectedFood.fatPerUnit * qty;
    }
  });

  document.getElementById("mealSection").classList.add("hidden");
  document.getElementById("resultSection").classList.remove("hidden");

  document.getElementById("totalCalories").innerText = `Toplam Kalori: ${totalCalories.toFixed(0)} kcal`;
  document.getElementById("totalCarbs").innerText = `Toplam Karbonhidrat: ${totalCarbs.toFixed(1)} gr`;
  document.getElementById("totalProtein").innerText = `Toplam Protein: ${totalProtein.toFixed(1)} gr`;
  document.getElementById("totalFat").innerText = `Toplam Yağ: ${totalFat.toFixed(1)} gr`;

  new Chart(document.getElementById("macroChart"), {
    type: "pie",
    data: {
      labels: ["Karbonhidrat", "Protein", "Yağ"],
      datasets: [{
        data: [
          totalCarbs * 4,
          totalProtein * 4,
          totalFat * 9
        ],
        backgroundColor: ["#60A5FA", "#34D399", "#FBBF24"]
      }]
    }
  });
}

function restart() {
  window.location.reload();
}
