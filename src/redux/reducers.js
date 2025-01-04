import { ADD_BILL, EDIT_BILL, DELETE_BILL, FILTER_BILLS, SET_HIGHLIGHTED_BILLS,UPDATE_BUDGET } from './actions';

const initialState = {
    bills: [
      {
        id: 1,
        description: "Dominoes",
        category: "FoodNDining",
        amount: "430",
        date: "01-02-2020",
      },
      {
        id: 2,
        description: "Car wash",
        category: "Utility",
        amount: "500",
        date: "01-06-2020",
      },
      {
        id: 3,
        description: "Amazon",
        category: "Shopping",
        amount: "2030",
        date: "01-07-2020",
      },
      {
        id: 4,
        description: "House rent",
        category: "FoodNDining",
        amount: "35900",
        date: "01-03-2020",
      },
      {
        id: 5,
        description: "Tuition",
        category: "Education",
        amount: "2200",
        date: "01-12-2020",
      },
      {
        id: 6,
        description: "Laundry",
        category: "Personal Care",
        amount: "320",
        date: "01-14-2020",
      },
      {
        id: 7,
        description: "Vacation",
        category: "Travel",
        amount: "3430",
        date: "01-18-2020",
      },
    ],
    filteredCategory: null,
    highlightedBills: [],
    budgets: {} 
  };
  

export const billsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BILL:
      return { ...state, bills: [...state.bills, action.payload] };
    case EDIT_BILL:
      return {
        ...state,
        bills: state.bills.map((bill) =>
          bill.id === action.payload.id ? action.payload : bill
        ),
      };
    case DELETE_BILL:
      return { ...state, bills: state.bills.filter((bill) => bill.id !== action.payload) };
    case FILTER_BILLS:
      return { ...state, filteredCategory: action.payload };
    case SET_HIGHLIGHTED_BILLS:
      return { ...state, highlightedBills: action.payload };
    case UPDATE_BUDGET:
        return { ...state, monthlyBudget: action.payload };
    default:
      return state;
  }
};
