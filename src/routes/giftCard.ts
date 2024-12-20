import {
  create,
  deleteGiftCard,
  getAll,
  getById,
  transferAmount,
  update
} from "../controllers/giftCard.controllers";
import {
  authMiddleware
} from "../functions/authentication";

export default [
  {
    path: "/gift_card/lista",
    method: "get",
    action: authMiddleware(getAll),
  },
  {
    path: "/gift_card/:id",
    method: "get",
    action: authMiddleware(getById),
  },
  {
    path: "/gift_card",
    method: "post",
    action: authMiddleware(create),
  },
  {
    path: "/gift_card/:id",
    method: "put",
    action: authMiddleware(update),
  },
  {
    path: "/gift_card/:id",
    method: "delete",
    action: authMiddleware(deleteGiftCard),
  },
  {
    path: "/gift_card/transfer",
    method: "post",
    action: authMiddleware(transferAmount),
  },

];
