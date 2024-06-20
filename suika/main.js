let Engine = Matter.Engine,
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
        background: '#F74C8', // 배경
        width: 620,
        height: 890,

    }
});

Render.run(engine);
Runner.run(render)
