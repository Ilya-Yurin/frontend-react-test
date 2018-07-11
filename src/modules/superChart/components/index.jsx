import React, { Component } from 'react';

import { Loader } from '../../../core/components/Loader';
import { MathArea } from '../../../core/utils/';


class SuperChart extends Component {

    static numberToPixels(number) {
        return `${number}px`;
    }

    static polygonToSVGPoints(polygon, yMax) {
        return polygon
            .map(point => `${point[0]},${yMax - point[1]}`)
            .reduce((a, b) => `${a} ${b}`);
    }

    static getPolygonMaxValues(polygon) {
        const xMax = polygon.reduce((max_x, currentPoint) => (
            currentPoint[0] > max_x ? currentPoint[0] : max_x
        ), -Infinity);
        const yMax = polygon.reduce((max_y, currentPoint) => (
            currentPoint[1] > max_y ? currentPoint[1] : max_y
        ), -Infinity);
        return {
            xMax: xMax,
            yMax: yMax
        };
    }

    static getPolygonMinYValue (polygon) {
        return polygon.reduce((max_y, currentPoint) => (
            currentPoint[1]  < max_y ? currentPoint[1] : max_y
        ), +Infinity);
    }

    static calcPolygonSquare (polygon) {
        return polygon.reduce((area, point, index, polygon) => (
            polygon[index - 1] ? area + MathArea.calcAreaUnderLineSegment(polygon[index - 1], point) : area
        ), 0);
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            polygon: [],
            polygonMaxValues: {
                xMax: 0,
                yMax: 0,
            },
            yMinCoordinate: 0,
            area: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        const max_values = this.constructor.getPolygonMaxValues(nextProps.polygon);
        this.setState({
            isLoaded: nextProps.isLoaded,
            polygon: nextProps.polygon,
            polygonMaxValues: {
                xMax: max_values.xMax,
                yMax: max_values.yMax
            },
            yMinCoordinate: this.constructor.getPolygonMinYValue(nextProps.polygon),
            area: this.constructor.calcPolygonSquare(nextProps.polygon),
        });
    }

    render() {
        const {width, height} = this.props;
        const {isLoaded, polygon, polygonMaxValues, yMinCoordinate, area} = this.state;
        return (
            <div
                className="super-chart"
                style={{
                    width: this.constructor.numberToPixels(width),
                    height: this.constructor.numberToPixels(height),
                }}
            >
                <h1>Super Chart</h1>
                {isLoaded
                    ? <svg
                        width='100%'
                        height='100%'
                        viewBox={`0 -1 ${polygonMaxValues.xMax} ${polygonMaxValues.yMax}`}
                        preserveAspectRatio="none"
                    >
                        <polyline
                            points={this.constructor.polygonToSVGPoints(polygon, polygonMaxValues.yMax, yMinCoordinate)}
                            fill="#4E5A7D"
                            stroke="#7E91C9"
                            strokeWidth="0.5"
                        />
                    </svg>
                    : <Loader.loading size={35}/>
                }
                <div className="super-chart__analytics">
                    {isLoaded && <div>max <span className="super-chart__analytics__value">{polygonMaxValues.yMax}</span></div>}
                    {isLoaded && <div>area <span className="super-chart__analytics__value">{area}</span></div>}
                </div>
            </div>
        );
    }
}
;

export default SuperChart;
