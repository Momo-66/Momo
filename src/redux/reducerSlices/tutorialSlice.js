import { createSlice } from '@reduxjs/toolkit';

const Step = {
    INIT_TUTORIAL: "init_tutorial",
    STEP_ONE: "step_one",
    STEP_TWO: "step_two",
    MID_TUTORIAL: "mid_tutorial",
    STEP_THREE: "step_three",
    ANIMATION_TUTORIAL: "animation_tutorial",
    END_TUTORIAL: "end_tutorial",
}

const initialState = {
    enableBackgroundImg: false,
    enableHeaderRightBtn: false,
    enableHeaderLeftBtn: false,
    enableBottomBtn: false,
    textColor: "#222222",
    step: Step.INIT_TUTORIAL,
};

export const tutorialSlice = createSlice({
    name: 'tutorial',
    initialState,
    reducers: {
        useBackgroundImg: (state) => {
            state.enableBackgroundImg = true;
            state.textColor = "#FFFFFF";
        },
        setEnableBottomBtn: (state, action) => {
            state.enableBottomBtn = action.payload.enableBottomBtn;
        },
        setStep: (state, action) => {
            if(action.payload.step == Step.INIT_TUTORIAL){
                state.step = action.payload.step;
                state.enableHeaderRightBtn = true;
            }
            else if(action.payload.step == Step.STEP_ONE){
                state.step = action.payload.step;
                state.enableHeaderRightBtn = false;
                state.enableHeaderLeftBtn = true;
            }
            else if(action.payload.step == Step.STEP_TWO){

            }
            else if(action.payload.step == Step.MID_TUTORIAL){
                
            }
            else if(action.payload.step == Step.STEP_THREE){
                
            }
            else if(action.payload.step == Step.ANIMATION_TUTORIAL){
                
            }
            else{
                
            }
        },
    },
});

export const {
    setEnableBottomBtn,
    setStep,
} = tutorialSlice.actions;

export default tutorialSlice.reducer;
