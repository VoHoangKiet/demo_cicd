export const initState = {
  patients: [],
  error: "",
  loading: true,    
};

export const patientReducer = (state, action) => {
  console.log("Reducer action:", action);
  switch (action.type) {
      case "FETCH_SUCCESS":
          return {
              patients: action.payload,
              error: "",
              loading: false,
          };
      case "FETCH_ERROR":
          return {
              patients: [],
              error: "Something went wrong",
              loading: false,
          };
      case "ADD_PATIENT":
          return {
              ...state,
              patients: [...state.patients, action.payload],
          };
      case "EDIT_PATIENT":
          return {
              ...state,
              patients: state.patients.map((t) =>
                  t.id === action.payload.id ? action.payload : t
              ),
          };
      case "DELETE_PATIENT":
          return {
              ...state,
              patients: state.patients.filter(t =>
                  t.id !== action.payload
              ),
          };
      default:
          return state;
  }
};
