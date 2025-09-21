// Simple recipe dataset
const RECIPES = [
{ 
id:1, 
name:'Avocado Toast', 
category:'Breakfast', 
img:'./assests/imgs/1.Avacado Toast.png',
desc:'Whole-grain toast topped with smashed avocado, lemon, and chili.',
ingredients:['2 slices whole-grain bread','1 ripe avocado','1 tsp lemon juice','Chili flakes','Salt'],
steps:['Toast bread','Mash avocado with lemon, salt','Spread on toast, sprinkle chili'],
nutrition:{Calories:'320 kcal', Protein:'8 g', Carbs:'36 g', Fat:'18 g'} },

{ 
id:2, 
name:'Rainbow Buddha Bowl', 
category:'Lunch', 
img:'./assests/imgs/2.Rainbow Buddha Bowl.png',
desc:'Brown rice with colourful veggies and tahini dressing.',
ingredients:['1 cup cooked brown rice','1 cup mixed veggies','1 tbsp tahini','1 tsp soy sauce'],
steps:['Fill bowl with rice','Top with veggies','Mix tahini + soy as dressing'],
nutrition:{Calories:'450 kcal', Protein:'14 g', Carbs:'70 g', Fat:'12 g'} },

{ 
id:3, 
name:'Chickpea Salad', 
category:'Vegan', 
img:'./assests/imgs/3.Chickpea Salad.png',
desc:'Protein-rich salad with lemon and herbs.',
ingredients:['1 can chickpeas','Cucumber','Tomato','Parsley','1 tbsp olive oil','Lemon'],
steps:['Rinse chickpeas','Chop veggies','Toss with oil + lemon + herbs'],
nutrition:{Calories:'380 kcal', Protein:'16 g', Carbs:'52 g', Fat:'10 g'} },

{
id: 4,
name: 'Quinoa Salad',
category: 'Lunch',
img: './assests/imgs/4.Quinoa Salad.png',
desc: 'A light, protein-packed salad with fresh veggies.',
ingredients: ['Cooked quinoa', 'Diced cucumber', 'Cherry tomatoes', 'Red onion', 'Feta cheese', 'Olive oil', 'Lemon juice', 'Salt', 'Pepper'],
steps: ['Cook and cool quinoa', 'Mix all ingredients in a bowl', 'Add dressing and toss', 'Top with feta cheese'],
nutrition: {Calories: '280 kcal', Protein: '9 g', Carbs: '35 g', Fat: '12 g'}
},
{
id: 5,
name: 'Greek Yogurt Parfait',
category: 'Breakfast',
img: './assests/imgs/5.Greek Yogurt Parfait.png',
desc: 'Layers of yogurt, granola, and sweet berries.',
ingredients: ['Greek yogurt', 'Granola', 'Mixed berries', 'Honey', 'Chia seeds'],
steps: ['Layer yogurt in a glass', 'Add granola and berries', 'Repeat the layers', 'Drizzle with honey'],
nutrition: {Calories: '350 kcal', Protein: '20 g', Carbs: '45 g', Fat: '10 g'}
},
{
id: 6,
name: 'Smoothie Bowl',
category: 'Breakfast',
img: './assests/imgs/6.Smoothie Bowl.png',
desc: 'A thick, creamy bowl topped with fruit and nuts.',
ingredients: ['Frozen banana', 'Frozen berries', 'Spinach', 'Almond milk', 'Sliced banana', 'Granola', 'Coconut flakes'],
steps: ['Blend fruits and milk until thick', 'Pour into a bowl', 'Add your favorite toppings'],
nutrition: {Calories: '300 kcal', Protein: '6 g', Carbs: '55 g', Fat: '8 g'}
},
{
id: 7,
name: 'Lentil Soup',
category: 'Dinner',
img: './assests/imgs/7.Lentil Soup.png',
desc: 'Hearty, protein-packed soup.',
ingredients: ['Brown lentils', 'Diced onion', 'Chopped carrots', 'Vegetable broth', 'Cumin', 'Salt', 'Pepper'],
steps: ['Sauté vegetables', 'Add lentils and broth', 'Simmer until tender'],
nutrition: {Calories: '250', Protein: '15g', Carbs: '40g', Fat: '2g'}
},
{
id: 8,
name: 'Grilled Veggie Wrap',
category: 'Snack',
img: './assests/imgs/8.Grilled Veggie Wrap.jpg',
desc: 'Portable wrap with smoky vegetables.',
ingredients: ['Whole-wheat tortilla', 'Bell pepper', 'Zucchini', 'Hummus', 'Spinach'],
steps: ['Grill vegetables', 'Spread hummus on tortilla', 'Add veggies and spinach', 'Roll up tightly'],
nutrition: {Calories: '320', Protein: '12g', Carbs: '45g', Fat: '10g'}
},
{
id: 9,
name: 'Overnight Oats',
category: 'Breakfast',
img: './assests/imgs/9.Overnight Oats.jpg',
desc: 'Creamy, no-cook breakfast.',
ingredients: ['Rolled oats', 'Milk or yogurt', 'Chia seeds', 'Honey', 'Berries'],
steps: ['Mix oats and milk in jar', 'Add chia seeds and honey', 'Refrigerate overnight', 'Top with berries'],
nutrition: {Calories: '300', Protein: '10g', Carbs: '50g', Fat: '7g'}
}



];

const grid = document.getElementById('recipesGrid');
const savedList = document.getElementById('savedList');
const search = document.getElementById('search');
const category = document.getElementById('category');

function renderRecipes(items){
  grid.innerHTML = items.map(r=>`
    <article class="recipe-card">
      <img src="${r.img}" alt="${r.name}">
      <div class="content">
        <h3>${r.name}</h3>
        <p>${r.desc}</p>
        <div class="actions">
          <button class="btn" data-open="${r.id}">View</button>
        </div>
      </div>
    </article>
  `).join('');
}

function filter(){
  const term = search.value.toLowerCase();
  const cat = category.value;
  const items = RECIPES.filter(r=>
    (cat==='all' || r.category===cat) && r.name.toLowerCase().includes(term)
  );
  renderRecipes(items);
}

if (grid){
  renderRecipes(RECIPES);
  search.addEventListener('input', filter);
  category.addEventListener('change', filter);
}

// Modal logic
const modal = document.getElementById('recipeModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalImg = document.getElementById('modalImg');
const modalDesc = document.getElementById('modalDesc');
const modalIngredients = document.getElementById('modalIngredients');
const modalSteps = document.getElementById('modalSteps');
const modalNutrition = document.getElementById('modalNutrition');
const saveBtn = document.getElementById('saveRecipeBtn');
let currentId = null;

grid?.addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-open]');
  if(!btn) return;
  const id = +btn.dataset.open; currentId = id;
  const r = RECIPES.find(x=>x.id===id);
  if(!r) return;
  modalTitle.textContent = r.name;
  modalImg.src = r.img; modalImg.alt = r.name;
  modalDesc.textContent = r.desc;
  modalIngredients.innerHTML = r.ingredients.map(i=>`<li>${i}</li>`).join('');
  modalSteps.innerHTML = r.steps.map(s=>`<li>${s}</li>`).join('');
  modalNutrition.innerHTML = Object.entries(r.nutrition).map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join('');
  modal.classList.add('show'); modal.setAttribute('open','');
});

closeModal?.addEventListener('click',()=>{ modal.classList.remove('show'); modal.removeAttribute('open'); });

saveBtn?.addEventListener('click',()=>{
  if(!currentId) return;
  const saved = JSON.parse(localStorage.getItem('savedRecipes')||'[]');
  if(!saved.includes(currentId)) saved.push(currentId);
  localStorage.setItem('savedRecipes', JSON.stringify(saved));
  alert('Saved! See "Saved Recipes" section.');
  renderSaved();
});

function renderSaved(){
  if(!savedList) return;
  const ids = JSON.parse(localStorage.getItem('savedRecipes')||'[]');
  const items = RECIPES.filter(r=>ids.includes(r.id));
  savedList.innerHTML = items.map(r=>`
    <article class="recipe-card">
      <img src="${r.img}" alt="${r.name}">
      <div class="content">
        <h3>${r.name}</h3>
        <button class="btn" data-open="${r.id}">View</button>
      </div>
    </article>
  `).join('') || '<p>No saved recipes yet.</p>';
}

renderSaved();


function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}