import Vue from "vue"
import Vuex from "vuex"
// import router from "@/router"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userGetDb: {},
    // 로그인유무
    loginSuccess: false,
    activation: false,
    active: false,
    mainTitle: [
      {
        menu: "관리 기능",
        subMenu: [
          { title: "정기권 관리", add: "periodicTicketM" },
          { title: "입주사 관리", add: "tenantM" },
          { title: "블랙 리스트 관리", add: "blackListM" },
          //  {title: "직원 관리", add: "staffM"},
          { title: "시간주차 요금제 관리", add: "timeParkingPlanM" },
          { title: "주차장 정보 관리", add: "parkingInformationM" },
          //  {title: "할인쿠폰 상품 관리", add: "couponProductM"},
          // {title: "할인감면관리", add: "reductionProductM"},
          { title: "공휴일 관리", add: "publicHolidayRegist" },
          { title: "정기권 판매 관리", add: "periodicTicketSalesM" },
          //    {title: "할인권 판매 관리", add: "discountTicketSalesM"},
          //    {title: "입주사 할인 정책1", add: "discountPolVisitedVeh"},
          { title: "할인상품관리", add: "discountPolVisitedVeh_1" },
          { title: "주차상품관리", add: "parkingProductM" },
          { title: "그룹 관리", add: "groupListM" }
          // {title: "차량 관리", add: "vehicleManagement"},
        ]
      },
      {
        menu: "운영 기능",
        subMenu: [
          { title: "차량출입(실시간)", add: "vehicleEntryExitLive" },
          { title: "이미지 촬영", add: "imageShooting" },
          { title: "차단기 개방 정책", add: "breakerOpeningPol" },
          // { title: "공지사항(정산소)", add: "noticeCalculationSta" },
          { title: "공지사항(전광판)", add: "noticeElectricalDisplay" }
        ]
      },
      {
        menu: "조회 기능",
        subMenu: [
          { title: "차량출입", add: "vehicleEntryExit" },
          { title: "입주사 방문 기록(입차)", add: "recTenantVisitEntry" },
          { title: "입주사 방문 기록(출차)", add: "recTenantVisitExit" },
          { title: "정산기록", add: "settlementRec" },
          { title: "정산기 이용 기록", add: "calculatorUtilizationRec" },
          // { title: "입주사 방문 등록", add: "registTenantVisits" },
          //  {title: "입주사 할인권 현황", add: "statusDiscountCoupons"},
          // { title: "현금 정산 기록", add: "cashSettlementRec" },
          //   { title: "할인 쿠폰 기록", add: "discountCouponRec" },
          // { title: "할인 감면 기록", add: "discountReductRec" },
          // { title: "수동(입차,출차,차단기 제어)조회", add: "manualCheck" },
          // { title: "장비 장애 기록", add: "equipmentFailureRec" },
          { title: "입주사 방문등록 조회", add: "residentVisitRegister" },
          { title: "지하주차장 입차 예약 관리", add: "manageVisitReservation" }
        ]
      },
      {
        menu: "통계 기능",
        subMenu: [
          { title: "일별 정산", add: "dailySettlement" },
          { title: "월별 정산", add: "monthlySettlement" },
          // { title: "일별 할인 쿠폰", add: "dailyDiscountCoupon" },
          // { title: "일별 할인 감면", add: "dailyDiscountReduct" },
          // { title: "월별 할인 쿠폰", add: "monthlyDiscountCoupon" },
          // { title: "월별 할인 감면", add: "monthlyDiscountReduct" },
          // { title: "정산소(일마감)", add: "settlementOffice" },
          { title: "입주사 일 정산", add: "dailySettlementTenants" },
          { title: "입주사 월 정산", add: "monthlySettlementTenants" }
        ]
      }
    ],
    freeMainTitles: [
      {
        menu: "관리 기능",
        subMenu: [
          { title: "차량 관리", add: "vehicleManagerM" },
          { title: "블랙 리스트 관리", add: "blackListM" },
          { title: "방문 예약차량 관리", add: "reserved_visit_vehicleM" }
          // {title: "정기권 관리", add: "periodicTicketM"},
          // {title: "입주사 관리", add: "tenantM"},

          // {title: "직원 관리", add: "staffM"},
          // {title: "시간주차 요금제 관리", add: "timeParkingPlanM"},
          // {title: "주차장 정보 관리", add: "parkingInformationM"},
          // {title: "할인쿠폰 상품 관리", add: "couponProductM"},
          // {title: "할인감면관리", add: "reductionProductM"},
          // {title: "공휴일 관리", add: "publicHolidayRegist"},
          // {title: "정기권 판매 관리", add: "periodicTicketSalesM"},
          // {title: "할인권 판매 관리", add: "discountTicketSalesM"},
          // {title: "입주사 방문차량 할인 정책", add: "discountPolVisitedVeh"},
          // {title: "주차 상품 관리", add: "parkingProductM"},
          // {title: "그룹 관리", add: "groupListM"},
        ]
      },
      {
        menu: "운영 기능",
        subMenu: [
          { title: "차량출입(실시간)", add: "vehicleEntryExitLive1" },
          { title: "이미지 촬영", add: "imageShooting" },
          { title: "차단기 개방 정책", add: "breakerOpeningPol" },
          // { title: "공지사항(정산소)", add: "noticeCalculationSta" },
          { title: "공지사항(전광판)", add: "noticeElectricalDisplay" }
        ]
      },
      {
        menu: "조회 기능",
        subMenu: [
          { title: "차량출입", add: "vehicleEntryExit" }
          // { title: "입주사 방문 기록(입차)", add: "recTenantVisitEntry" },
          // { title: "입주사 방문 기록(출차)", add: "recTenantVisitExit" },
          // { title: "정산기록", add: "settlementRec" },
          // { title: "정산기 이용 기록", add: "calculatorUtilizationRec" },
          // { title: "입주사 방문 등록", add: "registTenantVisits" },
          // {title: "입주사 할인권 현황", add: "statusDiscountCoupons"},
          // // { title: "현금 정산 기록", add: "cashSettlementRec" },
          // { title: "할인 쿠폰 기록", add: "discountCouponRec" },
          // { title: "할인 감면 기록", add: "discountReductRec" },
          // { title: "수동(입차,출차,차단기 제어)조회", add: "manualCheck" },
          // { title: "장비 장애 기록", add: "equipmentFailureRec" },
        ]
      },
      {
        menu: "통계 기능",
        subMenu: [
          { title: "일별 정산", add: "dailySettlementFree" },
          { title: "월별 정산", add: "monthlySettlementFree" }
          // { title: "일별 할인 쿠폰", add: "dailyDiscountCoupon" },
          // { title: "일별 할인 감면", add: "dailyDiscountReduct" },
          // { title: "월별 할인 쿠폰", add: "monthlyDiscountCoupon" },
          // { title: "월별 할인 감면", add: "monthlyDiscountReduct" },
          // { title: "정산소(일마감)", add: "settlementOffice" },
          // { title: "입주사 일 정산", add: "dailySettlementTenants" },
          // { title: "입주사 월 정산", add: "monthlySettlementTenants" },
        ]
      }
    ]
  },
  mutations: {
    isLoginSuccess(state, payload) {
      //  state.loginSuccess = true
      state.loginError = false
      state.userGetDb.id = payload.id
      state.userGetDb.pw = payload.pw
      state.userGetDb.status = "ok"
    },
    isLoginError(state) {
      state.loginSuccess = false
      state.loginError = true
    },
    logout(state) {
      localStorage.id = ""
      localStorage.pw = ""
      localStorage.status = ""
      state.loginSuccess = true
      state.loginError = false
      state.userGetDb = {}
      // router.push({ name: "login" })
    }
  },
  actions: {
    login({ commit }, payload) {
      commit("isLoginSuccess", payload)
      // router.push({ name: "pay_for_discounted_vehicle_list" })
      console.log("login 성공")
    },
    logout({ commit }) {
      commit("logout")
      // router.push({ name: "login" })
    }
  },
  modules: {}
})
