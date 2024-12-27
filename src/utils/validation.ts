import * as yup from "yup";

const AddTransactions = yup.object().shape({
  type: yup.string().required(),
  amount: yup.number().required(),
  category: yup.string().required(),
  date: yup.date().required(),
  description: yup.string().required(),
});

export {AddTransactions};
