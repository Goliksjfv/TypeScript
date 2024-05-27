import Math3D, { ETransform } from "../Math3D";
import Edge from "./Edge";
import Point from "./Point";
import Polygon from "./Polygon";

export type TAnimation = {
    method: ETransform;
    value: number;
    center: Point;
}

class Surface {
    points: Point[];
    edges: Edge[];
    polygons: Polygon[];
    center: Point
    animations: TAnimation[];

    constructor(
        points: Point[] = [],
        edges: Edge[] = [],
        polygons: Polygon[] = [],
        center = new Point
    ) {
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
        this.animations = [];
    }

    dropAnimation(): void {
        this.animations = [];
    }

    addAnimation(method: ETransform, value: number, center: Point): void {
        this.animations.push({ method, value, center: center || this.center });
    }

    doAnimation(math3D: Math3D): void {
        this.animations.forEach(anim => {
            const T1 = math3D.move(-anim.center.x, -anim.center.y, -anim.center.z);
            const T2 = math3D[anim.method](anim.value);
            const T3 = math3D.move(anim.center.x, anim.center.y, anim.center.z);
            const matrix = math3D.getTransform(T1, T2, T3);
            this.points.forEach(point => math3D.transform(matrix, point));
            math3D.transform(matrix, this.center);
        })
    }
}

export default Surface;