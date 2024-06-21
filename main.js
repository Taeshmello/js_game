import { FRUITS } from "./fruits.js";

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World;

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
    render : {fillStyle : "#E6B143"} // 
})

const rightWall = Bodies.rectangle(605, 395, 30, 790, {
    isStatic : true, //고정기능
    render : {fillStyle : "#E6B143"} // 
})

const ground = Bodies.rectangle(310, 820, 620, 60,{
    isStatic : true,
    render : {fillStyle: '#E6B143'}
})

const endLine = Bodies.rectangle(310, 150, 620, 2, {
    isStatic : true, //고정기능
    render : {fillStyle : "#E6B143"} // 
})

World.add(world, [leftWall, rightWall, ground, endLine])

Render.run(render);
Runner.run(engine);


// 과일 떨어지는 함수

const addFruit = () => {

    // 과일 배열 저장
    const index = 0;

    const fruits = FRUITS[index];

    const body = Bodies.circle(300, 50, fruits.radius, {
        render: {
            sprite: {texture : `${fruits.name}.png`},
        }
    });

    World.add(world, body)

}

addFruit();