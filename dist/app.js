const people = [
  {name:'מרגי', quote:'הייתי בטוח שאמשיך להיות עם נועה עד שליזה האירה את עיני כמה היא גרועה. תודה ליזה!'},
  {name:'נועם בתן', quote:'הגעתי בלי ביטחון לאירוויזיון אבל ברגע שליזה הודיעה לי שאהיה מקום ראשון או שני, ידעתי שאני מסוגל להצליח'},
  {name:'אנה זק', quote:'בוא תראה מה פספסת נכתב על ליזה לכל האקסים שלה. ההצלחה שלי בזכותה'},
  {name:'קיילי ג׳נר', quote:'התחלתי לתבוע בים'},
  {name:'גורדון רמזי', quote:'נחתכתי ביד בזמן הכנות והתעלפתי כשראיתי דם. התעוררתי במיון כשליזה סחבה אותי כל הדרך'},
  {name:'בילי אייליש', quote:'פחדתי להתלבש חשוף עד שראיתי שליזה יכולה והבנתי שגם אני. היא העלתה לי את הביטחון'},
  {name:'שאקירה', quote:'פעם מישהי אמרה לי הירכיים שלי לא משקרות. המישהי הזאת היא ליזה'},
  {name:'קארדי בי', quote:'פעם הייתי קארדי A ולא הצלחתי בעולם. אחרי הכרות עם ליזה זה היה כמו לידה מחדש ושם נוצרה קארדי B'},
  {name:'ג׳סטין ביבר', quote:'מכרתי את כל הזכויות של השירים שלי בשביל שאני אקנה לליזה בשמים. זה עדיין לא הספיק, אבל העיקר שהיא מאושרת'},
  {name:'עומר אדם', quote:'במקור נכתב ליזה איטס טה טיים אוף יור לייף, אבל היא הייתה בזוגיות והייתי חייב לשנות לבוקרשט'},
  {name:'אודיה', quote:'כתבתי שיר שלם על ליזה, אבל לא מבינים מה אני אומר בכלל'},
  {name:'מרגול', quote:'קניתי לליזה עץ ירוק מפלסטיק. זה לא הרשים את המלעונה הזאת'},
  {name:'יסמין מועלם', quote:'עברתי לארה״ב ואז ללונדון. אבל בשניה שראיתי את ליזה עברתי לארץ בשביל להיות קרובה אליה'},
  {name:'פיניאס', quote:'שכחתי כבר מי זאת איזבל ולא אכפת לי איפה פרי. כל יום בקיץ ארצה לבלות עם ליזה'},
  {name:'קים פוסיבל', quote:'בפורים אני רוצה להתחפש לליזה'},
  {name:'חוסטינה מירנדה גרסיה', quote:'שום מסע בזמן לא הכין אותי לנקודה שבה אסתכל לליזה על העיניים'}
];
const colors=[['#ff4f9a','#672db6'],['#ff8b3d','#d62d73'],['#52c5ff','#6557db'],['#47d7a3','#147a91'],['#f2bf43','#ee4d69'],['#bc73ff','#5b3fd5']];
const initials = name => name.split(/\s+/).map(x=>x[0]).slice(0,2).join('');
const hive=document.querySelector('#hive'), modal=document.querySelector('#modal'), portrait=document.querySelector('#portrait'), quote=document.querySelector('#quote'), modalName=document.querySelector('#modalName'), counter=document.querySelector('#counter');
let current=0, touchX=0;
people.forEach((p,i)=>{const b=document.createElement('button');const c=colors[i%colors.length];b.className='person';b.style.setProperty('--c1',c[0]);b.style.setProperty('--c2',c[1]);b.setAttribute('aria-label',`פתיחת הציטוט של ${p.name}`);b.innerHTML=`<span class="initials">${initials(p.name)}</span><span class="person-name">${p.name}</span>`;b.addEventListener('click',()=>open(i));hive.appendChild(b)});
function render(){const p=people[current],c=colors[current%colors.length];portrait.style.setProperty('--c1',c[0]);portrait.style.setProperty('--c2',c[1]);portrait.textContent=initials(p.name);quote.textContent=p.quote;modalName.textContent=p.name;counter.textContent=`${current+1} / ${people.length}`}
function open(i){current=i;render();modal.hidden=false;document.body.style.overflow='hidden';document.querySelector('.close').focus()}
function close(){modal.hidden=true;document.body.style.overflow='';document.querySelectorAll('.person')[current].focus()}
function move(step){current=(current+step+people.length)%people.length;render()}
document.querySelectorAll('[data-close]').forEach(x=>x.addEventListener('click',close));document.querySelector('.next').addEventListener('click',()=>move(1));document.querySelector('.prev').addEventListener('click',()=>move(-1));
document.addEventListener('keydown',e=>{if(modal.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowRight')move(-1);if(e.key==='ArrowLeft')move(1)});
modal.addEventListener('touchstart',e=>touchX=e.changedTouches[0].clientX,{passive:true});modal.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-touchX;if(Math.abs(d)>55)move(d>0?-1:1)},{passive:true});
