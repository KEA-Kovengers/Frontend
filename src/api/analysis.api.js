import httpApi from './http.api';

// 작업자와 생성한 블럭 아이디를 반환합니다
// 각 유저가 만든 블럭
export const GetUserBlocks = (postid) => {
  return httpApi.get(`/articles/log/${postid}`);
};

// 작업자들의 블럭 참여 목록을 조회합니다.
// 유저&참여 블록
export const GetParticipatedBlocks = (postid) => {
  return httpApi.get(`/articles/log/update/${postid}`);
};
