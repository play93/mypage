//===============================마우스 효과

const cursorEffect = document.querySelector(".cursor_effect");

//마우스 무브이벤트 생성
document.documentElement.addEventListener("mousemove",(e) => {
  let posX = e.clientX;
  let posY = e.clientY;

  cursorEffect.style.transform = `translate(${posX}px,${posY}px)`;
})

//======마우스 클릭시 효과
const cursorIcon = document.querySelector(".cursor_icon");
document.documentElement.addEventListener("mousedown",() => {
  //마우스버튼을 누르고있을 때
  cursorIcon.classList.add("active");
  //active클래스 추가
})
document.documentElement.addEventListener("mouseup",() => {
  //마우스 버튼을 뗐을 때
  cursorIcon.classList.remove("active");
  //active클래스 제거
})

//=====마우스 를 올리면 커서가 커지는 효과
const anchors = document.querySelectorAll("a, button, h3");
//마우스 올렸을 때 on클래스 추가
anchors.forEach(anchor => anchor.addEventListener("mouseover", () => {
  cursorEffect.classList.add("on")
}))
//마우스가 떠나면 on클래스 제거
anchors.forEach(anchor => anchor.addEventListener("mouseout", () => {
  cursorEffect.classList.remove("on")
}))


//===============================메뉴이동
//스크롤 값 구하기
//let scrollTop = window.pageYOffset;
//let scrollTop = document.documentElement.scrollTop;
//let scrollTop = window.scrollY;
//let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY; => 여러개 사용해서 호환성문제해결

document.querySelectorAll(".paraNav ul li a").forEach((li) => {
  li.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(li.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    })
  })
})

//스크롤 했을 때
window.addEventListener("scroll", function(){
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;

  if( scrollTop >= this.document.getElementById("banner").offsetTop){
    document.querySelectorAll(".paraNav ul li").forEach(li => {
      li.classList.remove("active");
    })
    document.querySelector(".paraNav ul li:nth-child(1)").classList.add("active")
  }
  if( scrollTop >= this.document.getElementById("About").offsetTop){
    document.querySelectorAll(".paraNav ul li").forEach(li => {
      li.classList.remove("active");
    })
    document.querySelector(".paraNav ul li:nth-child(2)").classList.add("active")
  }
  if( scrollTop >= this.document.getElementById("Skills").offsetTop){
    document.querySelectorAll(".paraNav ul li").forEach(li => {
      li.classList.remove("active");
    })
    document.querySelector(".paraNav ul li:nth-child(3)").classList.add("active")
  }
  if( scrollTop >= this.document.getElementById("My_works").offsetTop){
    document.querySelectorAll(".paraNav ul li").forEach(li => {
      li.classList.remove("active");
    })
    document.querySelector(".paraNav ul li:nth-child(4)").classList.add("active")
  }
  if( scrollTop >= this.document.getElementById("Contact").offsetTop -300 ){
    document.querySelectorAll(".paraNav ul li").forEach(li => {
      li.classList.remove("active");
    })
    document.querySelector(".paraNav ul li:nth-child(5)").classList.add("active")
  }
  
})

//===============================배너 타이핑효과
const textDisplay = document.getElementById('intro_text')
const phrases = ['준비된', '노력하는', '성장하는']
let i = 0
let j = 0 
let currentPhrase = []
let isDeleting = false
let isEnd = false

function loop () {
  isEnd = false
  textDisplay.innerHTML = currentPhrase.join('')

  if (i < phrases.length) {

    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j])
      j++
      textDisplay.innerHTML = currentPhrase.join('')
    }

    if(isDeleting && j <= phrases[i].length) {
      currentPhrase.pop(phrases[i][j])
      j--
      textDisplay.innerHTML = currentPhrase.join('')
    }

    if (j == phrases[i].length) {
      isEnd = true
      isDeleting = true
    }

    if (isDeleting && j === 0) {
      currentPhrase = []
      isDeleting = false
      i++
      if (i === phrases.length) {
        i = 0
      }
    }
  }
  //속도조절
  const spedUp = Math.random() * (80 -50) + 50
  const normalSpeed = Math.random() * (300 -200) + 200
  const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed
  setTimeout(loop, time)
}

loop()
//====================================================스킬 프로그래스바

$(function(){
  let charts = $('.charts');
  let chart = $('.chart');
  let chartOST = chart.offset().top - 700;
  //let excuted = false; //실행된적이 있니?의 값을 false로
  

  $(window).scroll(function(){
    let currentSCT = $(this).scrollTop();
    //스크롤 이벤트가 일어난 윈도우를 this로 받아 스크롤양을 구함
    if(currentSCT >= chartOST){//chart가 보일정도로 스크롤을 했다면
      if(!charts.hasClass('active')){
        animateChart();
        charts.addClass('active');
      }
      

    }
  })

  function animateChart(){
    chart.each(function(){
      let item = $(this);
      
      let title = item.find('.percnt'); 
      //숫자
      
      let targetNum =  title.attr('data-num'); 
      //숫자(title)이 가지고 있는 data-num속성
  
      let circle = item.find('circle');
  
      $({rate:0}).animate({rate:targetNum},
        {
          duration:1500, //1.5초 마다
          progress:function(){
            let now = this.rate; //여기서 this는 animate자체
            let amount = 628 - (628*now/100);
            title.text(Math.floor(now));
            circle.css({strokeDashoffset:amount})
          }
      });
  
    });//chart.each END
  }
});


//==============================myworks패럴랙스

window.addEventListener("scroll", doScroll);
//윈도우에 스크롤이벤트 발생시 doScroll함수호출.

function doScroll(){//doScroll함수

  let scrollMove = window.scrollY; //scrollMove = 스크롤이동값
  let ht = document.querySelector(".w_imgBox").offsetHeight;
  console.log(ht);//ht = 각 work div의 높이값
  const works = document.querySelectorAll(".w_imgBox");//works = 각 work div

  works.forEach((el) => {
    let thisTop = scrollMove + el.getBoundingClientRect().top;
    //console.log(thisTop);

    //각 요소에 스크롤 이벤트가 발생할 범위
    let start = thisTop - ht;
    let end = thisTop + ht;

    if(scrollMove > start && scrollMove <= end){
      //스크롤 이동값이 start변수값보다 크로 end값 보다는 작거나 같을때

      let value = scrollMove - start;

      el.querySelector(".w_img").style.bottom = -(value/3)+"px"
    }
    
  })

}

doScroll();

//=====================myworks에 Existing page버튼 클릭하면 팝업이미지뜨는 코드

const modal = document.querySelectorAll(".modal");
console.log(modal);
const button = document.querySelectorAll(".popupBtn");
console.log(button);
const closeBtn = document.querySelectorAll(".close");
console.log(closeBtn);
let funcs = [];

/*
button.forEach(button => button.addEventListener("click",() => {
  modal.style.display = "block";
}))


closeBtn.addEventListener("click",() => {
  modal.style.display = "none";
})

window.addEventListener("click",(e) => {
  if(e.target == modal){
    modal.style.display = "none"
  }
})
*/

function Modal(num){
  return function() {
    //해당 버튼 클릭시 모달띄움
    button[num].onclick = function(){
      modal[num].style.display = "block";
      console.log(num);
    }
    //닫기버튼 클릭시 모달닫음
    closeBtn[num].onclick = function() {
      modal[num].style.display = "none"
    }
  }; 
}
//원하는 모달 수 만큼 함수 호출해서 funcs함수에 정의
for(let i=0; i<button.length; i++) {
  funcs[i] =  Modal(i);
}
//원하는 모달 수 만큼 함수호출
for(let j=0; j<button.length; j++) {
  funcs[j]();
}
//영역밖을 클릭하면 닫음
window.onclick = function(event) {
  if (event.target.className == "modal") {
      event.target.style.display = "none";
  }
};
//================================리뉴얼페이지 새창에서 열기
function work1() {
  window.open('https://play93.github.io/portfolio1/');
}

function work2() {
  window.open('https://play93.github.io/portfolio2/');
}