const cards=[
 {name:'Charizard ex',set:'Obsidian Flames · #125',buy:55,sale:82,image:'https://images.pokemontcg.io/sv3/125.png'},
 {name:'Pikachu VMAX',set:'Vivid Voltage · #044',buy:70,sale:105,image:'https://images.pokemontcg.io/swsh4/044.png'},
 {name:'Umbreon VMAX',set:'Evolving Skies · #095',buy:185,sale:245,image:'https://images.pokemontcg.io/swsh7/095.png'},
 {name:'Mew ex',set:'Paldean Fates · #216',buy:8,sale:16,image:'https://images.pokemontcg.io/sv4pt5/216.png'},
 {name:'Gengar ex',set:'Phantom Forces · #114',buy:30,sale:52,image:'https://images.pokemontcg.io/xy4/114.png'},
 {name:'Rayquaza VMAX',set:'Evolving Skies · #218',buy:120,sale:165,image:'https://images.pokemontcg.io/swsh7/218.png'}
];

const grid=document.querySelector('#cardGrid');
const search=document.querySelector('#cardSearch');
const empty=document.querySelector('#emptyState');

function money(n){return `$${n.toFixed(2)}`}
function renderCards(filter=''){
  const q=filter.trim().toLowerCase();
  const matches=cards.filter(c=>(c.name+' '+c.set).toLowerCase().includes(q));
  empty.hidden=matches.length!==0;
  grid.innerHTML=matches.map(c=>{
    const gross=c.sale-c.buy;
    const fee=c.sale*.13;
    const profit=gross-fee-5;
    return `<article class="deal-card">
      <div class="card-art"><img src="${c.image}" alt="${c.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.hidden=false"><div class="fallback-art" hidden>⚡</div></div>
      <div class="deal-body"><div class="deal-top"><div><h3>${c.name}</h3><div class="set">${c.set}</div></div><span class="badge">POTENTIAL DEAL</span></div>
      <div class="prices"><div><small>Example buy</small><strong>${money(c.buy)}</strong></div><div><small>Example sale</small><strong>${money(c.sale)}</strong></div></div>
      <div class="prices"><div><small>Est. profit*</small><strong>${money(profit)}</strong></div><div><small>Gross upside</small><strong>${money(gross)}</strong></div></div>
      <a class="deal-button" href="https://www.tcgplayer.com/search/pokemon/product?q=${encodeURIComponent(c.name)}&productLineName=pokemon" target="_blank" rel="noopener">Check current listings ↗</a></div>
    </article>`;
  }).join('');
}
search.addEventListener('input',e=>renderCards(e.target.value));
renderCards();

const buy=document.querySelector('#buyPrice');
const sale=document.querySelector('#salePrice');
const fee=document.querySelector('#feeRate');
const shipping=document.querySelector('#shipping');
const profit=document.querySelector('#profit');
const margin=document.querySelector('#margin');
function calculate(){
  const b=Number(buy.value)||0,s=Number(sale.value)||0,f=Number(fee.value)||0,ship=Number(shipping.value)||0;
  const p=s-(s*f/100)-ship-b;
  const m=s>0?(p/s)*100:0;
  profit.textContent=money(p);
  profit.style.color=p>=0?'var(--green)':'#fb7185';
  margin.textContent=`${m.toFixed(1)}% margin`;
}
[buy,sale,fee,shipping].forEach(input=>input.addEventListener('input',calculate));
calculate();

const menuButton=document.querySelector('#menuButton');
const menu=document.querySelector('#menu');
menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'✕':'☰'});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰'}));