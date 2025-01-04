export const ADD_BILL = 'ADD_BILL';
export const EDIT_BILL = 'EDIT_BILL';
export const DELETE_BILL = 'DELETE_BILL';
export const FILTER_BILLS = 'FILTER_BILLS';
export const SET_HIGHLIGHTED_BILLS = 'SET_HIGHLIGHTED_BILLS';
export const UPDATE_BUDGET = 'UPDATE_BUDGET';
export const updateBudget = (budget) => ({ type: UPDATE_BUDGET, payload: budget });

export const addBill = (bill) => ({ type: ADD_BILL, payload: bill });
export const editBill = (bill) => ({ type: EDIT_BILL, payload: bill });
export const deleteBill = (id) => ({ type: DELETE_BILL, payload: id });
export const filterBills = (category) => ({ type: FILTER_BILLS, payload: category });
export const setHighlightedBills = (highlightedBills) => ({ type: SET_HIGHLIGHTED_BILLS, payload: highlightedBills });
