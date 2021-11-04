const OBJECTS_PER_PIXEL_SQUARED = 1 / (100 * 100);
const DT = 16 / 1000;

const objects = [];
const background = document.getElementById("background");

function syncObject(object) {
  //object.element.style.transform = `translate(${object.x}px, ${object.y}px) rotate(${object.t}rad) scale(${object.size})`;
  object.element.style.left = `${Math.floor(object.x)}px`;
  object.element.style.top = `${Math.floor(object.y)}px`;
}

function animate() {
  for (const object of objects) {
    object.x = (object.x + object.vx * DT) % background.offsetWidth;
    object.y = (object.y + object.vy * DT) % background.offsetHeight;
    object.t = (object.t + object.vt * DT) % (Math.PI * 2);

    syncObject(object);
  }

  requestAnimationFrame(animate);
}

function makeObject() {
  const element = document.createElement("div");
  element.innerHTML = "eneai"[Math.floor(Math.random() * 5)];
  const x = background.offsetWidth * Math.random();
  const y = background.offsetHeight * Math.random();
  const vs = Math.random() * 20 + 10;
  const vd = Math.random() * Math.PI * 2;
  const vx = vs * Math.cos(vd);
  const vy = vs * Math.sin(vd);
  const t = Math.random() * Math.PI * 2;
  const vt = 0;
  const size = Math.random() * 2 + 3;
  element.style.transform = `rotate(${t}rad) scale(${size})`;

  const object = {
    x: x,
    y: y,
    vx: vx,
    vy: vy,
    size: size,
    t: t,
    vt: vt,
    element: element,
  };
  syncObject(object);

  return object;
}

window.addEventListener("load", function () {
  // Estimate the number of objects based on the screen size
  // offsetWidth and offsetHeight scale with zooming
  const area = background.offsetWidth * background.offsetHeight;
  const num_objects = Math.min(
    Math.max(Math.floor(area * OBJECTS_PER_PIXEL_SQUARED), 10),
    40
  );

  for (let i = 0; i < num_objects; i++) {
    const object = makeObject();
    background.appendChild(object.element);
    objects.push(object);
  }

  requestAnimationFrame(animate);
});
