import { createSlice } from '@reduxjs/toolkit';
import { Step } from '../../utils/tutorials/Step';

const initialState = {
    isStepScreen: false,
    enableBackgroundImg: false,
    enableHeaderRightBtn: false,
    enableHeaderLeftBtn: false,
    enableBottomBtn: false,
    textColor: "#222222",
    step: Step.INIT_TUTORIAL,
    stepNumber: 0,
    stepText: "",
    stepBottomContentOpacity: 0,
    isTutorialMomo: false,
    startTime: null,
    finishTime: null,
    isValidTime: true,
    totalDifficulty: 0,
    remainingTime: 0,
};

export const tutorialSlice = createSlice({
    name: 'tutorial',
    initialState,
    reducers: {
        useBackgroundImg: (state) => {
            state.enableBackgroundImg = true;
        },
        setEnableBottomBtn: (state, action) => {
            state.enableBottomBtn = action.payload.enableBottomBtn;
        },
        setStartTime: (state, action) => {
            state.startTime = action.payload.startTime;
        },
        setFinishTime: (state, action) => {
            state.finishTime = action.payload.finishTime;
        },
        setStep: (state, action) => {
            if(action.payload.step == Step.INIT_TUTORIAL){
                state.step = action.payload.step;
                state.isStepScreen = false;
                state.enableHeaderRightBtn = true;
                state.enableHeaderLeftBtn = false;
                state.enableBottomBtn = false;
                state.isTutorialMomo = false;
                state.enableBackgroundImg = false;
            }
            else if(action.payload.step == Step.STEP_ONE){
                state.step = action.payload.step;
                state.isStepScreen = true;
                state.enableHeaderRightBtn = false;
                state.enableHeaderLeftBtn = true;
                state.enableBottomBtn = true;
                state.stepNumber = 1;
                state.stepText = "기상 시간을 설정해주세요.";
                state.stepBottomContentOpacity = 0;
                state.isTutorialMomo = false;
                state.enableBackgroundImg = false;
            }
            else if(action.payload.step == Step.STEP_TWO){
                state.step = action.payload.step;
                state.isStepScreen = true;
                state.enableHeaderRightBtn = false;
                state.enableHeaderLeftBtn = true;
                state.enableBottomBtn = true;
                state.stepNumber = 2;
                state.stepText = "모든 루틴을 마칠 시간을\n설정해주세요.";
                state.stepBottomContentOpacity = 1;
                state.isTutorialMomo = false;
                state.enableBackgroundImg = false;
            }
            else if(action.payload.step == Step.MID_TUTORIAL){
                state.step = action.payload.step;
                state.isStepScreen = false;
                state.enableHeaderRightBtn = false;
                state.enableHeaderLeftBtn = false;
                state.enableBottomBtn = false;
                state.isTutorialMomo = false;
                state.enableBackgroundImg = false;
            }
            else if(action.payload.step == Step.STEP_THREE){
                state.step = action.payload.step;
                state.isStepScreen = true;
                state.enableHeaderRightBtn = false;
                state.enableHeaderLeftBtn = true;
                state.enableBottomBtn = true;
                state.stepNumber = 3;
                state.stepText = "기상 후에 수행하게 될\n나의 루틴을 설정해 주세요.";
                state.stepBottomContentOpacity = 1;
                state.isTutorialMomo = false;
                state.enableBackgroundImg = true;
            }
            else if(action.payload.step == Step.ANIMATION_TUTORIAL){
                state.step = action.payload.step;
                state.isStepScreen = false;
                state.enableHeaderRightBtn = true;
                state.enableHeaderLeftBtn = true;
                state.enableBottomBtn = false;
                state.isTutorialMomo = true;
                state.enableBackgroundImg = true;
            }
            else{
                state.step = action.payload.step;
                state.isStepScreen = false;
                state.enableHeaderRightBtn = false;
                state.enableHeaderLeftBtn = true;
                state.enableBottomBtn = true;
                state.isTutorialMomo = true;
                state.enableBackgroundImg = true;
            }
        },
        setEnableBottomBtn: (state, action) => {
            state.enableBottomBtn = action.payload.enableBottomBtn;
        },
        setisValidTime: (state, action) => {
            state.isValidTime = action.payload.isValidTime;
        },
        setTotalDifficulty: (state, action) => {
            state.totalDifficulty = action.payload.totalDifficulty;
        },
        setremainTime: (state, action) => {
            state.remainingTime = action.payload.remainingTime;
        },
    },
});

export const {
    useBackgroundImg,
    setEnableBottomBtn,
    setStartTime,
    setFinishTime,
    setStep,
    setisValidTime,
    setTotalDifficulty,
    setremainTime,
} = tutorialSlice.actions;

export default tutorialSlice.reducer;
