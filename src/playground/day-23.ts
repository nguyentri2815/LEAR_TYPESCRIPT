// Discriminator Unions
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    default:
      throw new Error("Unknown shape");
  }
}

const mySquare: Square = { kind: "square", size: 5 };
const myRectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };
const myCircle: Circle = { kind: "circle", radius: 3 };
console.log(area(mySquare)); // 25
console.log(area(myRectangle)); // 24
console.log(area(myCircle)); // 28.274333882308138

// fetch status
// type FetchStatus =
//   | { status: "idle" }
//   | { status: "loading" }
//   | { status: "success"; data: unknown }
//   | { status: "error"; message: string };
// function handleFetchStatus(status: FetchStatus) {
//   switch (status.status) {
//     case "idle":
//         console.log("Fetch is idle");
//         break;
//     case "loading":
//         console.log("Fetch is loading");
//         break;
//     case "success":
//         console.log("Fetch succeeded with data:", status.data);
//         break;
//     case "error":
//         console.error("Fetch failed with message:", status.message);
//         break;
//     default:
//         throw new Error("Unknown fetch status");
//   }
// }

// const idleStatus: FetchStatus = { status: "idle" };
// const loadingStatus: FetchStatus = { status: "loading" };
// const successStatus: FetchStatus = { status: "success", data: { id: 1, name: "Test" } };
// const errorStatus: FetchStatus = { status: "error", message: "Network error" };

// handleFetchStatus(idleStatus);
// handleFetchStatus(loadingStatus);
// handleFetchStatus(successStatus);
// handleFetchStatus(errorStatus);
