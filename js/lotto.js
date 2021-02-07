// 로또 번호를 관리하는 데 필요한 변수들!
let isCreate = false // 생성중엔 true가 된다.
const lotto = new Array(6)
let step = 0; // 이것이 6이 되면 생성 완료!
let intervalId = 0; // 셋인터벌 관리용
const createComment = ["생성중..", "생성중...", "생성중."]

// 전체 번호 표시용 함수
function createWholeNumber(){
    for(let i = 1; i <= 45; i++){
        const numDiv = document.createElement("div")
        numDiv.innerHTML = `<p class="number">${i}</p>`
        numDiv.id = `no-${i}`
        $(".js-numbers").append(numDiv)
    }
}

function clearNumbers(){
    // 선택된 애들이 선택되었다는 표시를 없앤다!
    $('.selected').removeClass("selected")
}

// 여섯 개의 번호 선택해 주는 함수
function createNumbers(){
    if(isCreate){
        return; // 생성중이라면 함수를 강제 종료!
    }
    isCreate = true; // 생성해도 된다면 생성상태로 바꾸자!
    
    // 이미 선택되어 있던 애들은 다 정리하기!
    clearNumbers();
    
    let count = 0;
    let flag = true;
    
    while(count < 6){
        let number = parseInt(Math.random() * 45) + 1;
        
        for(let i = 0; i < count; i++){
            if(lotto[i] == number){
                flag = false; // 중복이 된다는 의미!
            }
        }
        if(flag){
            lotto[count] = number;
            count++;
        }
        flag = true; // 앞으로도 계속 중족 검사를 할거다!
    }
    console.log(lotto) // 테스트...
    
    // 0.5초마다 숫자 하나씩 보여주는 작업!
    $(".ing").addClass("visible")
    intervalId = setInterval(pointNumbers, 500)
}

// 배열 lotto에 번호 여섯개가 다 들어갔다고 가정!
function pointNumbers(){
    $(`#no-${lotto[step]}`).addClass("selected")
    $(".ing").text(createComment[step % 3])
    step++;
    
    // 번호 표시가 끝났다!
    if(step == 6){
        clearInterval(intervalId) // 주기적 동작 종료!
        displayNumbers();
        $(".ing").removeClass("visible")
        step = 0;
        isCreate = false; // 생성 안하는 상태!
    }
}

// 여섯 개의 번호 선택을 마치고 나면, 밑에 리스트업!
function displayNumbers(){
    const numberContainer = document.createElement("div")
    
    for(let i = 0; i < 6; i++){
        const number = document.createElement("div")
        number.textContent = `${lotto[i]}`
        // 미션 : 이따가 공개
        if(lotto[i] < 10){
            $(number).css("backgroundColor", "coral")
        }else if(lotto[i] < 20){
            $(number).css("backgroundColor", "MediumPurple")
        }else if(lotto[i] < 30){
            $(number).css("backgroundColor", "indianRed")
        }else if(lotto[i] < 40){
            $(number).css("backgroundColor", "darkseagreen")
        }else{
            $(number).css("backgroundColor", "cornflowerblue")
        }
        $(numberContainer).css("display", "none")
        numberContainer.appendChild(number)
    } // for문 끝!
    
    $(".result").append(numberContainer)
    $(numberContainer).fadeIn(2000)
    $(".js-reset").show();
}

function init(){
    createWholeNumber();
    $(".ing").removeClass("visible")
}

function resetNumbers(){
    clearNumbers(); // 선택된 번호 없는 상태로 만들기
    $(".result").empty(); // 디스플레이중인 번호 싹 없애기!
    $(".js-reset").hide(); // 초기화 버튼 안보이게 하기!
}

// 문서 로드(준비) 완료 후 실행할 코드 블록!
$(document).ready(function(){
    // 1) 초기 셋팅 내용에 대한 함수
    init();
    // 2) 생성하기 버튼의 동작에 대한 등록!
    $(".js-btn").click(createNumbers)
    // 3) 초기화 버튼의 동작에 대한 등록!
    $(".js-reset").click(resetNumbers)
})