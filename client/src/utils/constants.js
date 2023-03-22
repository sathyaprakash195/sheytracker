import moment from "moment";
export const dateFormat = (date) => {
  return moment(date).format("MMMM Do YYYY, h:mm A");
};

export const formFieldRule = [
  {
    required: true,
    message: "Required",
  },
];
