import actoinType from "./ActionType";

export const changePage = (pageId) => ({
  type: actoinType.CHANGE_PAGE,
  payload: {
    pageId,
  }
})
