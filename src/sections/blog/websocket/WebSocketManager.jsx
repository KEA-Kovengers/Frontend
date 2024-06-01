// WebSocketManager.jsx
import React, { useEffect, useState } from 'react';

export default function WebSocketManager(){

    // 블럭 내용 업데이트 요청 정의
    const updateBlock = (operationType) => {
    const blockId = document.getElementById('n_block1').value;
    const blockContent = document.getElementById('block_content').value;
    const textPosition = document.getElementById('text_position').value;

    let entityType = "";
    let operationType2 = "";

    // 텍스트 삽입, 삭제, 태그 명령에 따라 entityType와 operationType2를 정의

    // 텍스트 삽입
    if (operationType === 'INSERT') {
        entityType = 'TEXT';
        operationType2 = 'INSERT';
    } 
    // 텍스트 삭제
    else if (operationType === 'DELETE') {
        entityType = 'TEXT';
        operationType2 = 'DELETE';
    } 
    // 태그
    else if (operationType === 'TAG') {
        entityType = 'TAG';
        operationType2 = 'INSERT';
    }

    // 서버에 메세지 발행
    //URL과 DTO는 노션의 명세서 참고
    stompClient.publish({
        destination: `/app/updateBlock/${articleID}`,
        body: JSON.stringify({
            'uuid': 'testtest',
            'userID': userID,
            'dto': {
                'blockId': blockId,
                'articleVersion': articleVersion,
                'entityType': entityType,
                'operationType': operationType2,
                'position': textPosition,
                'content': blockContent,
                'updated_by': {
                    'updater_id': userID,
                    'updated_at': new Date().toISOString()
                }
            }
        })
    });
    };

    //블럭 생성 요청 정의
    const createBlock = () => {
    const blockContent = document.getElementById('block_content').value;

    // 서버에 메세지 발행
    //URL과 DTO는 노션의 명세서 참고
    stompClient.publish({
        destination: `/app/createBlock/${articleID}`,
        body: JSON.stringify({
            'uuid': 'testtest',
            'userID': userID,
            'dto': {
                'articleVersion': articleVersion,
                'blockType': 'testBlockType',
                'position': blockIds.length,
                'content': blockContent,
                'blockParent': {
                    'type': 'testType',
                    'page_id': 'testPageId'
                },
                'created_by': {
                    'creator_id': userID,
                    'created_at': new Date().toISOString()
                }
            }
        })
    });
    };

    // 블럭 순서 업데이트 요청 정의
    const sequenceUpdate = () => {
    const blockId = document.getElementById('n_block2').value;
    const blockIndex = document.getElementById('block_index').value;

    // 서버에 메세지 발행
    //URL과 DTO는 노션의 명세서 참고
    stompClient.publish({
        destination: `/app/updateBlockSequence/${articleID}`,
        body: JSON.stringify({
            'uuid': 'testtest',
            'userID': userID,
            'dto': {
                'blockID': blockId,
                'position': blockIndex,
                'articleVersion': articleVersion,
                'entityType': 'BLOCK',
                'operationType': 'SEQUENCE_UPDATE',
                'updated_by': {
                    'updater_id': userID,
                    'updated_at': new Date().toISOString()
                }
            }
        })
    });
    };

    // 블럭 삭제 요청 정의
    const blockDelete = () => {
    const blockId = document.getElementById('n_block3').value;

    // 서버에 메세지 발행
    //URL과 DTO는 노션의 명세서 참고
    stompClient.publish({
        destination: `/app/deleteBlock/${articleID}`,
        body: JSON.stringify({
            'uuid': 'testtest',
            'userID': userID,
            'dto': blockId
        })
    });
    };

    // 블럭 업데이트 메세지 수신 및 로직 정의
    const receiveUpdateBlock = (dto) => {
    console.log('receiveUpdateBlock:', dto);

    // 게시글에 대한 편집 내용을 수신하면 해당 버전에 맞게 로컬 게시글 버전을 업데이트 해야함
    // 만약 네트워크 속도로 인해 낮은 버전이 먼저 도착하면 무시해야함
    setArticleVersion(dto.articleVersion);
    const index = blockIds.indexOf(dto.blockId);

    // 업데이트 메소드에 따라 다른 작업 수행
    // TAG는 블록 내용을 완전히 교체함
    if (dto.entityType === 'TAG') {
        setBlockContents(prev => {
            const newContents = [...prev];
            newContents[index] = dto.content;
            return newContents;
        });
    } 
    // INSERT는 블록 내용에 추가함
    // position변수는 충돌이 발생하면 서버에서 OT알고리즘으로 적절히 수정해주기때문에
    // position 위치에 content를 입력하면 된다.
    else if (dto.operationType === 'INSERT') {
        setBlockContents(prev => {
            const newContents = [...prev];
            newContents[index] = (newContents[index] || '') + dto.content;
            return newContents;
        });
    } 
    // DELTE는 블록 내용에서 삭제함
    // position위치로부터 content길이만큼 삭제하면 된다.
    else if (dto.operationType === 'DELETE') {
        setBlockContents(prev => {
            const newContents = [...prev];
            newContents[index] = newContents[index].slice(0, dto.position) + newContents[index].slice(dto.position + dto.content.length);
            return newContents;
        });
    }
    };

    // 블럭 생성 메세지 수신
    const receiveCreateBlock = (dto) => {
    console.log('receiveCreateBlock:', dto);
    setBlockIds(prev => [...prev.slice(0, dto.position), dto.blockDTO.id, ...prev.slice(dto.position)]);
    setBlockContents(prev => [...prev.slice(0, dto.position), dto.blockDTO.content, ...prev.slice(dto.position)]);
    setArticleVersion(dto.articleVersion);
    };

    // 블럭 순서 업데이트 메세지 수신
    const receiveUpdateBlockSequence = (dto) => {
    console.log('receiveUpdateBlockSequence:', dto);
    setArticleVersion(dto.articleVersion);
    setBlockIds(prev => {
        const newIds = [...prev];
        const idx = newIds.indexOf(dto.blockID);
        newIds.splice(idx, 1);
        newIds.splice(dto.position, 0, dto.blockID);
        return newIds;
    });
    setBlockContents(prev => {
        const newContents = [...prev];
        const content = newContents[idx];
        const idx = newContents.indexOf(dto.blockID);
        newContents.splice(idx, 1);
        newContents.splice(dto.position, 0, content);
        return newContents;
    });
    };

    // 블럭 삭제 메세지 수신
    const receiveDeleteBlock = (dto) => {
    console.log('receiveDeleteBlock:', dto);
    setArticleVersion(dto.articleVersion);
    setBlockIds(prev => prev.filter(id => id !== dto.blockId));
    setBlockContents(prev => prev.filter((_, index) => index !== blockIds.indexOf(dto.blockId)));
    };
  return null;
};

