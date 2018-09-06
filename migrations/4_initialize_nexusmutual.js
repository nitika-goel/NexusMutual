var Claims = artifacts.require('Claims');
var ClaimsData = artifacts.require('ClaimsData');
var ClaimsReward = artifacts.require('ClaimsReward');
var DAI = artifacts.require('DAI');
var NXMaster = artifacts.require('NXMaster');
var NXMaster2 = artifacts.require('NXMaster2');
var MCR = artifacts.require('MCR');
var MCRData = artifacts.require('MCRData');
var NXMToken1 = artifacts.require('NXMToken1');
var NXMToken2 = artifacts.require('NXMToken2');
var NXMTokenData = artifacts.require('NXMTokenData');
var Pool1 = artifacts.require('Pool1');
var Pool2 = artifacts.require('Pool2');
var Pool3 = artifacts.require('Pool3');
var PoolData = artifacts.require('PoolData');
var Quotation = artifacts.require('Quotation');
var QuotationData = artifacts.require('QuotationData');
var MemberRoles = artifacts.require('MemberRoles');

const QE = '0xb24919181daead6635e613576ca11c5aa5a4e133'; //web3.eth.accounts[19];
const WETH_0x = web3.eth.accounts[18];
const Exchange_0x = web3.eth.accounts[17];

module.exports = deployer => {
  let nxms;
  let nxms2;
  let nxmt1;
  let nxmt2;
  let nxmtd;
  let pl1;
  let pl2;
  let pl3;
  let pd;
  let qt;
  let qd;
  let cl;
  let cr;
  let cd;
  let mcr;
  let mcrd;
  let nown;
  deployer
    .then(() => NXMaster.deployed())
    .then(function(instance) {
      nxms = instance;
      return NXMaster2.deployed();
    })
    .then(function(instance) {
      nxms2 = instance;
      return NXMToken1.deployed();
    })
    .then(function(instance) {
      nxmt1 = instance;
      return NXMToken2.deployed();
    })
    .then(function(instance) {
      nxmt2 = instance;
      return NXMTokenData.deployed();
    })
    .then(function(instance) {
      nxmtd = instance;
      return MCR.deployed();
    })
    .then(function(instance) {
      mcr = instance;
      return MCRData.deployed();
    })
    .then(function(instance) {
      mcrd = instance;
      return Pool1.deployed();
    })
    .then(function(instance) {
      pl1 = instance;
      return Pool2.deployed();
    })
    .then(function(instance) {
      pl2 = instance;
      return Pool3.deployed();
    })
    .then(function(instance) {
      pl3 = instance;
      return PoolData.deployed();
    })
    .then(function(instance) {
      pd = instance;
      return Claims.deployed();
    })
    .then(function(instance) {
      cl = instance;
      return ClaimsReward.deployed();
    })
    .then(function(instance) {
      cr = instance;
      return ClaimsData.deployed();
    })
    .then(function(instance) {
      cd = instance;
      return Quotation.deployed();
    })
    .then(function(instance) {
      qt = instance;
      return QuotationData.deployed();
    })
    .then(function(instance) {
      qd = instance;
      var addr = [
        qd.address,
        nxmtd.address,
        cd.address,
        pd.address,
        mcrd.address,
        qt.address,
        nxmt1.address,
        nxmt2.address,
        cl.address,
        cr.address,
        pl1.address,
        pl2.address,
        nxms2.address,
        mcr.address,
        pl3.address
      ];
      console.log('address initialized');
      return nxms.addNewVersion(addr);
    })
    .then(function() {
      console.log('Add new version');
      return nxms.switchToRecentVersion();
    })
    .then(function() {
      console.log('switchToRecentVersion');
      return nxms.owner();
    })
    .then(function(owner) {
      nown = owner;
      console.log(nown);
      return pl1.takeEthersOnly({ from: nown, value: 2000000000000000000 });
    })
    .then(function() {
      return nxmtd.setWalletAddress(nown); //"0x7266c50f1f461d2748e675b907ef22987f6b5358");
    })
    .then(function() {
      return qd.changeAuthQuoteEngine(QE); //"0xb24919181daead6635e613576ca11c5aa5a4e133");
    })
    .then(function() {
      return nxms2.addCoverStatus();
    })
    .then(function() {
      return nxms2.callPoolDataMethods();
    })
    .then(function() {
      return nxms2.addStatusInClaims();
    })
    .then(function() {
      return nxms2.addMCRCurr();
    })
    .then(function() {
      return nxms2.addStatusInClaims();
    })
    .then(function() {
      return pd.changeWETHAddress(WETH_0x); //"0xd0a1e359811322d97991e03f863a0c30c2cf029c");
    })
    .then(function() {
      return DAI.deployed();
    })
    .then(function(dai) {
      return pd.changeCurrencyAssetAddress('0x444149', dai.address); //"0xd0a1e359811322d97991e03f863a0c30c2cf029c");
    })
    .then(function() {
      return pd.change0xMakerAddress(nown); //"0x7266C50F1f461d2748e675B907eF22987F6B5358");
    })
    .then(function() {
      return pl2.changeExchangeContractAddress(Exchange_0x); //"0x90fe2af704b34e0224bf2299c838e04d4dcf1364");
    })
    .then(function() {
      return pl3.changeExchangeContractAddress(Exchange_0x); //"0x90fe2af704b34e0224bf2299c838e04d4dcf1364");
    })
    .then(function() {
      return mcr.changenotariseAddress(nown); //"0x7266c50f1f461d2748e675b907ef22987f6b5358");
    })
    .then(function() {
      var arg1 = 18000;
      var arg2 = 10000;
      var arg3 = 2;
      var arg4 = ['0x455448', '0x444149'];
      var arg5 = [100, 65407];
      var arg6 = 20180807;
      return mcr.addMCRData(arg1, arg2, arg3, arg4, arg5, arg6);
    })
    /*.then(function(){
        console.log("hel");
        return pl3.saveIADetails(["0x444744","0x49434e","0x5a5258","0x4d4b52","0x474e54","0x4d4c4e"],[100,200,300,400,500,600],20180807);
    })*/
    .then(function() {
      return MemberRoles.deployed();
    })
    .then(function(mr) {
      return nxms.changeMemberRolesAddress(mr.address);
    });
};