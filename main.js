import { FRUITS } from "./fruits.js";
import { Matter } from "./matter.js";

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World,
    Body = Matter.body;

//엔진 선언
const engine = Engine.create();

// 렌더 선언
const render = Render.create({
    engine,
    element: document.body,
    options: {
        wireframes : false,
        background: '#F7F4C8', // 배경
        width: 620,
        height: 850,

    }
});


const world = engine.world;

const leftWall = Bodies.rectangle(15, 395, 30, 790, {
    isStatic : true, //고정기능
    render : {fillStyle : "#E6B143"}
})

const rightWall = Bodies.rectangle(605, 395, 30, 790, {
    isStatic : true, //고정기능
    render : {fillStyle : "#E6B143"}
})

const ground = Bodies.rectangle(310, 820, 620, 60,{
    isStatic : true,
    render : {fillStyle: '#E6B143'}
})

const endLine = Bodies.rectangle(310, 150, 620, 2, {
    isStatic : true, //고정기능
    isSensor : true, // 충돌은 감지하나 물리엔진은 적용 안 함
    render : {fillStyle : "#E6B143"}
})

World.add(world, [leftWall, rightWall, ground, endLine])

Render.run(render);
Runner.run(engine);




//현재 과일 값을 저장할 변수 생성
let currentBody;
let currentFruit;

//키 조작 제어 변수
let disableAction = false;


// 과일 떨어지는 함수

const addFruit = () => {

    // 과일 배열 저장
    const index = Math.floor(Math.random() * 5);

    const fruits = FRUITS[index];

    const body = Bodies.circle(300, 50, fruits.radius, {
        index : index,
        isSleeping : true, // 떨어짐 대기
        render: {
            sprite: {texture : `${fruits.name}.png`},
        },
    restitution : 0.2,
    });

    //현재 과일값 저장
    currentBody = body;
    currentFruit = fruits

    World.add(world, body)

   
    }

    window.onkeydown = (event) => {

        //제어 조작 변수가 true 일 경우 바로 리턴
        if(disableAction){
            return;
        }

        switch(event.code) {
            case "KeyA":
                Body.setPosition(currentBody, {
                    x: currentBody.position.x - 10,
                    y: currentBody.position.y
                })
                break;
            case "KeyD":
                Body.setPosition(currentBody,{
                    x: currentBody.position.x + 10,
                    y: currentBody.position.y
                })
                break;
            case "KeyS":
                currentBody.isSleeping = false;
                disableAction = true;

                setTimeout(()=>{
                    addFruit();
                    disableAction = false;
                }, 1000);
                break;
        }
    }



addFruit();