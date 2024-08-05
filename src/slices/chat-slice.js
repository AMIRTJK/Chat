import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  postUsers,
  postUsersStructure,
  getUserStructure,
  postUserChat,
  getUserChats,
  getVisaList,
  getVisaListTemp,
  postVisaListTemp,
  getTermDate,
  postTermDate,
  getVisaStatus,
  getVisaStatusTemp,
  postVisaStatusTemp,
  getChatById,
  getMessageById,
  getShowUserChat,
  postMessageById,
  getUsersAuth,
  postUserAuth,
  getVisaUsers,
  postVisaUsers,
  putVisaUsers,
  getUserStructureExecutor,
  getUserChatsExecutor,
  postUserChatsExecutor,
  getVisaMessage,
  postVisaMessage,
  deleteVisaMessage,
  getDefaultVisa,
  getOwnVisa,
  putUserChatsExecutor,
  getSubMessages,
  postSubMessage,
  deleteSubMessage,
  putSubMessages,
  getSubUserChatTabs,
  postSubUserChatTabs,
  deleteSubUserChatTabs,
  getSubTabMessages,
  postSubTabMessages,
  deleteSubTabMessages,
  putSubUserChatTabsById,
  getSubUserChatTabsById,
  getInvitedToSubChatTabs,
  getTabVisaUsers,
  postTabVisaUsers,
  getSubTabVisaMessages,
  postSubTabVisaMessages,
  putTabVisaUsersTerm,
  getSubTabConclusionList,
  postSubTabConclusionList,
  putSubTabConclusionList,
  getSubTabConclusionListEds,
  postSubTabConclusionListEds,
  putSubTabConclusionListEds,
  getSubTabConclusionListTemp,
  postSubTabConclusionListTemp,
  putSubTabConclusionListTempText,
  putSubTabConclusionListTempStatus,
  putSubTabConclusionListTempStatusEnd,
  getSubTabConclusionListEdsTemp,
  postSubTabConclusionListEdsTemp,
  putSubTabConclusionListEdsTempStatus,
  getSubTabConclusionListLiveChat,
  postSubTabConclusionListLiveChat,
  deleteSubTabConclusionListLiveChat,
  getSubTabConclusionListTempAttachment,
  postSubTabConclusionListTempAttachment,
  putSubTabConclusionListTempAttachment,
} from "../actions/chatApi";

const initialState = {
  data: [],
  showStructure: false,
  users: [],
  userStructure: [],
  userChats: [],
  showVisa: false,
  visaList: [],
  visaListTemp: [],
  termDate: [],
  visaStatus: [],
  visaStatusTemp: [],
  showDocPdf: false,
  asideMessage: false,
  showSend: "",
  moreVert: false,
  chatById: [],
  messageById: [],
  showUserChat: [],
  signLogin: "",
  signPassword: "",
  signNumber: "",
  usersAuth: [],
  regLog: true,
  renderOfRole: false,
  showReply: false,
  getReplyMessage: null,
  showCertificate: {},
  ownVisaValue: "",
  visaUsers: [],
  showVisaPopUp: false,
  userStructureExecutor: [],
  subUserChats: [],
  executorVisa: false,
  visaMessage: [],
  visaTemp: {},
  visaExecutors: [],
  defaultVisa: [],
  ownVisa: [],
  subMessages: [],
  subUserChatTabs: [],
  subTabMessages: [],
  subUserChatTabsById: [],
  invitedToSubChatTabs: [],
  tabNameValue: "",
  invite: "",
  subTabVisaUsers: [],
  subTabVisaMessages: [],
  subTabConclusionList: [],
  subTabConclusionListEds: [],
  subTabConclusionListTemp: [],
  subTabConclusionListEdsTemp: [],
  liveChatMessages: [],
  conclusionAttachment: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setShowStructure: (state, action) => {
      state.showStructure = action.payload;
    },
    setShowVisa: (state, action) => {
      state.showVisa = action.payload;
    },
    setShowDocPdf: (state, action) => {
      state.showDocPdf = action.payload;
    },
    setAsideMessage: (state, action) => {
      state.asideMessage = action.payload;
    },
    setShowSend: (state, action) => {
      state.showSend = action.payload;
    },
    setMoreVert: (state, action) => {
      state.moreVert = action.payload;
    },
    setSignLogin: (state, action) => {
      state.signLogin = action.payload;
    },
    setSignPassword: (state, action) => {
      state.signPassword = action.payload;
    },
    setSignNumber: (state, action) => {
      state.signNumber = action.payload;
    },
    setRegLog: (state, action) => {
      state.regLog = action.payload;
    },
    setRenderOfRole: (state, action) => {
      state.renderOfRole = action.payload;
    },
    setShowReply: (state, action) => {
      state.showReply = action.payload;
    },
    setGetReplyMessage: (state, action) => {
      state.getReplyMessage = action.payload;
    },
    setShowCertificate: (state, action) => {
      state.showCertificate = action.payload;
    },
    setOwnVisaValue: (state, action) => {
      state.ownVisaValue = action.payload;
    },
    setShowVisaPopUp: (state, action) => {
      state.showVisaPopUp = action.payload;
    },
    setExecutorVisa: (state, action) => {
      state.executorVisa = action.payload;
    },
    setVisaTemp: (state, action) => {
      state.visaTemp = action.payload;
    },
    setTabNameValue: (state, action) => {
      state.tabNameValue = action.payload;
    },
    setInvite: (state, action) => {
      state.invite = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(postUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUserStructure.fulfilled, (state, action) => {
      state.userStructure = action.payload;
    });
    builder.addCase(postUsersStructure.fulfilled, (state, action) => {
      state.userStructure = action.payload;
    });
    builder.addCase(postUserChat.fulfilled, (state, action) => {
      state.userChats = action.payload;
    });
    builder.addCase(getUserChats.fulfilled, (state, action) => {
      state.userChats = action.payload;
    });
    builder.addCase(getVisaList.fulfilled, (state, action) => {
      state.visaList = action.payload;
    });
    builder.addCase(getVisaListTemp.fulfilled, (state, action) => {
      state.visaListTemp = action.payload;
    });
    builder.addCase(postVisaListTemp.fulfilled, (state, action) => {
      state.visaListTemp = action.payload;
    });
    builder.addCase(getChatById.fulfilled, (state, action) => {
      state.chatById = action.payload;
    });
    builder.addCase(getMessageById.fulfilled, (state, action) => {
      state.messageById = action.payload;
    });
    builder.addCase(getShowUserChat.fulfilled, (state, action) => {
      state.showUserChat = action.payload;
    });
    builder.addCase(postMessageById.fulfilled, (state, action) => {
      state.messageById = action.payload;
    });
    builder.addCase(getUsersAuth.fulfilled, (state, action) => {
      state.usersAuth = action.payload;
    });
    builder.addCase(postUserAuth.fulfilled, (state, action) => {
      state.usersAuth = action.payload;
    });
    builder.addCase(getTermDate.fulfilled, (state, action) => {
      state.termDate = action.payload;
    });
    builder.addCase(postTermDate.fulfilled, (state, action) => {
      state.termDate = action.payload;
    });
    builder.addCase(getVisaStatus.fulfilled, (state, action) => {
      state.visaStatus = action.payload;
    });
    builder.addCase(getVisaStatusTemp.fulfilled, (state, action) => {
      state.visaStatusTemp = action.payload;
    });
    builder.addCase(postVisaStatusTemp.fulfilled, (state, action) => {
      state.visaStatusTemp = action.payload;
    });
    builder.addCase(getVisaUsers.fulfilled, (state, action) => {
      state.visaUsers = action.payload;
    });
    builder.addCase(postVisaUsers.fulfilled, (state, action) => {
      state.visaUsers = action.payload;
    });
    builder.addCase(putVisaUsers.fulfilled, (state, action) => {
      state.visaUsers = action.payload;
    });
    builder.addCase(getUserStructureExecutor.fulfilled, (state, action) => {
      state.userStructureExecutor = action.payload;
    });
    builder.addCase(getUserChatsExecutor.fulfilled, (state, action) => {
      state.subUserChats = action.payload;
    });
    builder.addCase(postUserChatsExecutor.fulfilled, (state, action) => {
      state.subUserChats = action.payload;
    });
    builder.addCase(getVisaMessage.fulfilled, (state, action) => {
      state.visaMessage = action.payload;
    });
    builder.addCase(postVisaMessage.fulfilled, (state, action) => {
      state.visaMessage = action.payload;
    });
    builder.addCase(deleteVisaMessage.fulfilled, (state, action) => {
      state.visaMessage = action.payload;
    });
    builder.addCase(getDefaultVisa.fulfilled, (state, action) => {
      state.defaultVisa = action.payload;
    });
    builder.addCase(getOwnVisa.fulfilled, (state, action) => {
      state.ownVisa = action.payload;
    });
    builder.addCase(putUserChatsExecutor.fulfilled, (state, action) => {
      state.subUserChats = action.payload;
    });
    builder.addCase(getSubMessages.fulfilled, (state, action) => {
      state.subMessages = action.payload;
    });
    builder.addCase(postSubMessage.fulfilled, (state, action) => {
      state.subMessages = action.payload;
    });
    builder.addCase(deleteSubMessage.fulfilled, (state, action) => {
      state.subMessages = action.payload;
    });
    builder.addCase(putSubMessages.fulfilled, (state, action) => {
      state.subMessages = action.payload;
    });
    builder.addCase(getSubUserChatTabs.fulfilled, (state, action) => {
      state.subUserChatTabs = action.payload;
    });
    builder.addCase(postSubUserChatTabs.fulfilled, (state, action) => {
      state.subUserChatTabs = action.payload;
    });
    builder.addCase(deleteSubUserChatTabs.fulfilled, (state, action) => {
      state.subUserChatTabs = action.payload;
    });
    builder.addCase(getSubTabMessages.fulfilled, (state, action) => {
      state.subTabMessages = action.payload;
    });
    builder.addCase(postSubTabMessages.fulfilled, (state, action) => {
      state.subTabMessages = action.payload;
    });
    builder.addCase(deleteSubTabMessages.fulfilled, (state, action) => {
      state.subTabMessages = action.payload;
    });
    builder.addCase(putSubUserChatTabsById.fulfilled, (state, action) => {
      state.subUserChatTabsById = action.payload;
    });
    builder.addCase(getSubUserChatTabsById.fulfilled, (state, action) => {
      state.subUserChatTabsById = action.payload;
    });
    builder.addCase(getInvitedToSubChatTabs.fulfilled, (state, action) => {
      state.invitedToSubChatTabs = action.payload;
    });
    builder.addCase(getTabVisaUsers.fulfilled, (state, action) => {
      state.subTabVisaUsers = action.payload;
    });
    builder.addCase(postTabVisaUsers.fulfilled, (state, action) => {
      state.subTabVisaUsers = action.payload;
    });
    builder.addCase(getSubTabVisaMessages.fulfilled, (state, action) => {
      state.subTabVisaMessages = action.payload;
    });
    builder.addCase(postSubTabVisaMessages.fulfilled, (state, action) => {
      state.subTabVisaMessages = action.payload;
    });
    builder.addCase(putTabVisaUsersTerm.fulfilled, (state, action) => {
      state.subTabVisaUsers = action.payload;
    });
    builder.addCase(getSubTabConclusionList.fulfilled, (state, action) => {
      state.subTabConclusionList = action.payload;
    });
    builder.addCase(postSubTabConclusionList.fulfilled, (state, action) => {
      state.subTabConclusionList = action.payload;
    });
    builder.addCase(putSubTabConclusionList.fulfilled, (state, action) => {
      state.subTabConclusionList = action.payload;
    });
    builder.addCase(getSubTabConclusionListEds.fulfilled, (state, action) => {
      state.subTabConclusionListEds = action.payload;
    });
    builder.addCase(postSubTabConclusionListEds.fulfilled, (state, action) => {
      state.subTabConclusionListEds = action.payload;
    });
    builder.addCase(putSubTabConclusionListEds.fulfilled, (state, action) => {
      state.subTabConclusionListEds = action.payload;
    });
    builder.addCase(getSubTabConclusionListTemp.fulfilled, (state, action) => {
      state.subTabConclusionListTemp = action.payload;
    });
    builder.addCase(postSubTabConclusionListTemp.fulfilled, (state, action) => {
      state.subTabConclusionListTemp = action.payload;
    });
    builder.addCase(
      putSubTabConclusionListTempText.fulfilled,
      (state, action) => {
        state.subTabConclusionListTemp = action.payload;
      }
    );
    builder.addCase(
      putSubTabConclusionListTempStatus.fulfilled,
      (state, action) => {
        state.subTabConclusionListTemp = action.payload;
      }
    );
    builder.addCase(
      putSubTabConclusionListTempStatusEnd.fulfilled,
      (state, action) => {
        state.subTabConclusionListTemp = action.payload;
      }
    );
    builder.addCase(
      getSubTabConclusionListEdsTemp.fulfilled,
      (state, action) => {
        state.subTabConclusionListEdsTemp = action.payload;
      }
    );
    builder.addCase(
      postSubTabConclusionListEdsTemp.fulfilled,
      (state, action) => {
        state.subTabConclusionListEdsTemp = action.payload;
      }
    );
    builder.addCase(
      putSubTabConclusionListEdsTempStatus.fulfilled,
      (state, action) => {
        state.subTabConclusionListEdsTemp = action.payload;
      }
    );
    builder.addCase(
      getSubTabConclusionListLiveChat.fulfilled,
      (state, action) => {
        state.liveChatMessages = action.payload;
      }
    );
    builder.addCase(
      postSubTabConclusionListLiveChat.fulfilled,
      (state, action) => {
        state.liveChatMessages = action.payload;
      }
    );
    builder.addCase(
      deleteSubTabConclusionListLiveChat.fulfilled,
      (state, action) => {
        state.liveChatMessages = action.payload;
      }
    );
    builder.addCase(
      getSubTabConclusionListTempAttachment.fulfilled,
      (state, action) => {
        state.conclusionAttachment = action.payload;
      }
    );
    builder.addCase(
      postSubTabConclusionListTempAttachment.fulfilled,
      (state, action) => {
        state.conclusionAttachment = action.payload;
      }
    );
    builder.addCase(
      putSubTabConclusionListTempAttachment.fulfilled,
      (state, action) => {
        state.conclusionAttachment = action.payload;
      }
    );
  },
});

export const { reducer, actions } = chatSlice;
