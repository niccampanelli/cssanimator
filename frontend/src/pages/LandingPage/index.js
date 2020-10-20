import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
//import API from '../../services/connection';
import { RiRecordCircleLine } from 'react-icons/ri';
import { FaPlay, FaPlus } from 'react-icons/fa';
import './styles.css';

export default function LandingPage(){

    //const [editedElement, setEdited] = useState(null);
    const [arrayDeObjetos, setArrayDeObjetos] = useState([]);
    const [rulerTimestamps, setRulerTimestamps] = useState([]);

    window.onload = () => {
        
        const screenWidth = window.screen.width;

        const timeline = document.querySelector(".timeline");
        const timelineSheet = document.querySelector(".timelineSheet");
        const timelineRuler = document.querySelector(".timelineRuler");
        const timelineRulerDiv = document.querySelector(".timelineRulerDiv");
        const timelineObjects = document.querySelector(".timelineObjects");
        const timelineSheetObjects = document.querySelector(".timelineSheetObjects");

        setRulerTimestamps(Array.apply(null, Array(screenWidth)));

        console.log(arrayDeObjetos);

        timelineSheetObjects.style.width = timelineRulerDiv.offsetWidth + "px";
        timelineObjects.style.height = timelineSheet.style.height;
        timelineSheet.style.height = timelineObjects.style.height;

        timelineObjects.onscroll = () => {
            timelineSheet.scrollTop =  timelineObjects.scrollTop;
        }
        timelineSheet.onscroll = () => {
            timelineObjects.scrollTop =  timelineSheet.scrollTop;
            timelineRuler.scrollLeft =  timelineSheet.scrollLeft;
        }

        //Element dragging section -----------------------------------------------------------------------------------
        const container = document.getElementById("dragContainer");
        var activeItem = null;
        var active = false;

        //Drag event listeners for container elements
        container.addEventListener("touchstart", dragStart, false);
        container.addEventListener("touchend", dragEnd, false);
        container.addEventListener("touchmove", drag, false);
            container.addEventListener("mousedown", dragStart, false);
            container.addEventListener("mouseup", dragEnd, false);
            container.addEventListener("mousemove", drag, false);

        //Drag event listeners for timeline keyframes
        timeline.addEventListener("touchstart", dragStart, false);
        timeline.addEventListener("touchend", dragEnd, false);
        timeline.addEventListener("touchmove", drag, false);
            timeline.addEventListener("mousedown", dragStart, false);
            timeline.addEventListener("mouseup", dragEnd, false);
            timeline.addEventListener("mousemove", drag, false);


        function dragStart(e) {
            if (e.target !== e.currentTarget) {
                active = true;

                if(e.target.id === "itemToDrag" || e.target.id === "keyFrame" || e.target.id === "timelineCursor"){
                    activeItem = e.target;
                }
                else{
                    return;
                }

                if (activeItem !== null) {
                    if(activeItem.id === "itemToDrag"){
                        if (!activeItem.xOffset) {
                            activeItem.xOffset = 0;
                        }
    
                        if (!activeItem.yOffset) {
                            activeItem.yOffset = 0;
                        }
    
                        if (e.type === "touchstart") {
                            activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                            activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
                        }
                        else {
                            activeItem.initialX = e.clientX - activeItem.xOffset;
                            activeItem.initialY = e.clientY - activeItem.yOffset;
                        }
                    }
                    else if(activeItem.id === "keyFrame" || activeItem.id === "timelineCursor"){
                        if (!activeItem.xOffset) {
                            activeItem.xOffset = 0;
                        }

                        if (e.type === "touchstart") {
                            activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                        }
                        else {
                            activeItem.initialX = e.clientX - activeItem.xOffset;
                        }
                    }
                }
                else{
                    return;
                }
            }
        }

        function dragEnd(e) {
            if (activeItem !== null) {
                if(activeItem.id === "itemToDrag"){
                    activeItem.initialX = activeItem.currentX;
                    activeItem.initialY = activeItem.currentY;
                }
                else if(activeItem.id === "keyFrame" || activeItem.id === "timelineCursor"){
                    activeItem.initialX = activeItem.currentX;
                }
            }

            active = false;
            activeItem = null;
        }

        function drag(e) {
            if (active) {
                if(activeItem !== null){
                    if (e.type === "touchmove") {
                        e.preventDefault();

                            if(activeItem.id === "itemToDrag"){
                                activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
                                activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
                            }
                            else if(activeItem.id === "keyFrame" || activeItem.id === "timelineCursor"){
                                activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
                            }
                        }
                    else {
                        if(activeItem.id === "itemToDrag"){
                            activeItem.currentX = e.clientX - activeItem.initialX;
                            activeItem.currentY = e.clientY - activeItem.initialY;
                        }
                        else if(activeItem.id === "keyFrame" || activeItem.id === "timelineCursor"){
                            activeItem.currentX = e.clientX - activeItem.initialX;
                        }
                    }
    
                    if(activeItem.id === "itemToDrag"){
                        activeItem.xOffset = activeItem.currentX;
                        activeItem.yOffset = activeItem.currentY;

                        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
                    }
                    else if(activeItem.id === "keyFrame" || activeItem.id === "timelineCursor"){
                        activeItem.xOffset = activeItem.currentX;

                        setTranslate(activeItem.currentX, 0, activeItem);
                    }
                }
            }
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
            //setEdited(el);
        }

        timelineSheetObjects.addEventListener("mousedown", startCounting, false);
        timelineSheetObjects.addEventListener("touchstart", startCounting, false);

        var clicks = 0;
        var positionToAdd = 0;

        function startCounting(e){
            clicks ++;
            const keyFrameToAdd = document.createElement("div");
            keyFrameToAdd.className = "keyFrame";
            keyFrameToAdd.id = "keyFrame";
            keyFrameToAdd.draggable = "false";

            if(clicks === 2){
                if (e.type === "touchstart") {
                    positionToAdd = e.touches[0].clientX;
                } else {
                    positionToAdd = e.clientX;
                }

                keyFrameToAdd.style.left = positionToAdd - timelineObjects.offsetWidth - 10 + "px";
                e.target.appendChild(keyFrameToAdd);

                console.log(positionToAdd);

            }

            setTimeout(() => {
                clicks = 0;
                console.log("zerou");
            }, 1000);
        }
    }

    const addObject = () => {
        const timelineObjectsList = document.querySelector(".timelineObjectsList");
        const line = document.createElement("li");
        var lastElementID;

        if(timelineObjectsList.lastChild !== null){
            lastElementID = (parseInt(timelineObjectsList.lastChild.id) + 1).toString();
        }
        else{
            lastElementID = "1";
        }

        line.innerHTML = "Objeto" + lastElementID;
        line.className = "timelineObject";
        line.setAttribute("id", lastElementID);

        timelineObjectsList.appendChild(line);
        setArrayDeObjetos(Array.apply(null, Array(timelineObjectsList.childElementCount)));
    }

    //async function sendData(e){
        //e.preventDefault();

        //const response = await API.get(`/criar?conteudo=${content}&filename=${nome}`);
        //console.log(response);
    //}

    //const teste = () => {
        //const values = editedElement.style.transform.split(/\w+\(|\);?/);
        //const transform = values[1].split(/,\s?/g).map(parseInt);

        //console.log(transform[0]);
        //editedElement.style.transform = `translate3d(${transform[0]}px, ${transform[1]}px, 0)`;
    //};

    return (
        <div className="wrapDiv">
            <div id="dragContainer">
                <div className="exampleItem" id="itemToDrag"></div>
            </div>
            <section className="timelineSection">
                <div className="timelineWrap">
                    <div className="timelineAttributes">
                        <div className="timelineOptions">
                            <div className="timelineOptionsButtons">
                                <button className="timelineOptionsRecordButton">
                                    <RiRecordCircleLine className="timelineOptionsRecord" color="white"/>
                                    REC
                                </button>
                                <button className="timelineOptionsPlayButton">
                                    <FaPlay className="timelineOptionsPlay" color="#ffffff"/>
                                    Play
                                </button>
                            </div>
                                <button onClick={addObject} className="timelineOptionsAddButton">
                                    <FaPlus className="timelineOptionsAdd" color="#20A4F3"/>
                                </button>
                            <div className="timelineOptionsRuler">
                                <h1 className="timelineOptionsRulerLabel">Segundos: </h1>
                            </div>
                        </div>
                        <div className="timelineObjects">
                            <ul className="timelineObjectsList">
                            </ul>
                        </div>
                    </div>
                    <div className="timeline">
                        <div className="timelineRuler">
                            <div className="timelineRulerDiv">
                                {rulerTimestamps.map((element, index) => (
                                    <h1 className="timelineRulerTimestamps">{index}</h1>
                                ))}
                            </div>
                        </div>
                        <div className="timelineSheet">
                            <div className="timelineSheetObjects">
                                <div className="timelineCursor" id="timelineCursor"></div>
                                {arrayDeObjetos.map(element => (
                                    <li className="timelineObject"></li>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}