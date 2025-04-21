// Yiyecek verileri (kalori, karbonhidrat, protein, yağ)
const foodData = {
    "Feast İnce Patates": { calories: 137, carbs: 22.0, protein: 2.0, fat: 4.5 },
    "Yumurta": { calories: 608, carbs: 5.2, protein: 31.98, fat: 51.7 },
    "Zeytin Ezmesi": { calories: 204, carbs: 0.6, protein: 0.6, fat: 21.0 },
    "Kıyma": { calories: 398, carbs: 1.36, protein: 55.22, fat: 24.44 },
    "Hindistan Cevizi Yağı": { calories: 178, carbs: 0.0, protein: 0.0, fat: 20.0 }
};

// Kullanıcı seçimlerini dinleyip hesaplamaları güncelleme
function updateTotals() {
    const selectedFood = document.getElementById('food').value;
    const quantity = document.getElementById('quantity').value;
    const foodInfo = foodData[selectedFood];

    const calories = (foodInfo.calories * quantity) / 100;
    const protein = (foodInfo.protein * quantity) / 100;
    const carbs = (foodInfo.carbs * quantity) / 100;
    const fat = (foodInfo.fat * quantity) / 100;

    // Kalori, protein, karbonhidrat ve yağ hesaplama
    document.getElementById('total-calories').textContent = calories.toFixed(2);
    document.getElementById('total-protein').textContent = protein.toFixed(2);
    document.getElementById('total-carbs').textContent = carbs.toFixed(2);
    document.getElementById('total-fat').textContent = fat.toFixed(2);

    // Günlük kalori hedefi ve progress bar
    const dailyGoal = 1600; // Örnek günlük hedef
    const progress = (calories / dailyGoal) * 100;
    document.getElementById('progress-bar').value = progress;
}

// Etkinlikleri dinleme
document.getElementById('food').addEventListener('change', updateTotals);
document.getElementById('quantity').addEventListener('input', updateTotals);

// İlk hesaplamayı başlat
updateTotals();
