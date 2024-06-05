import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  CallOFTReceivedSuccess,
  MessageFailed,
  NonContractAddress,
  OwnershipTransferred,
  Paused,
  ReceiveFromChain,
  RetryMessageSuccess,
  SendToChain,
  SetDefaultFeeBp,
  SetFeeBp,
  SetFeeOwner,
  SetMinDstGas,
  SetPrecrime,
  SetTrustedRemote,
  SetTrustedRemoteAddress,
  Transfer,
  Unpaused
} from "../generated/Astar/Astar"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createCallOFTReceivedSuccessEvent(
  _srcChainId: i32,
  _srcAddress: Bytes,
  _nonce: BigInt,
  _hash: Bytes
): CallOFTReceivedSuccess {
  let callOftReceivedSuccessEvent = changetype<CallOFTReceivedSuccess>(
    newMockEvent()
  )

  callOftReceivedSuccessEvent.parameters = new Array()

  callOftReceivedSuccessEvent.parameters.push(
    new ethereum.EventParam(
      "_srcChainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_srcChainId))
    )
  )
  callOftReceivedSuccessEvent.parameters.push(
    new ethereum.EventParam(
      "_srcAddress",
      ethereum.Value.fromBytes(_srcAddress)
    )
  )
  callOftReceivedSuccessEvent.parameters.push(
    new ethereum.EventParam("_nonce", ethereum.Value.fromUnsignedBigInt(_nonce))
  )
  callOftReceivedSuccessEvent.parameters.push(
    new ethereum.EventParam("_hash", ethereum.Value.fromFixedBytes(_hash))
  )

  return callOftReceivedSuccessEvent
}

export function createMessageFailedEvent(
  _srcChainId: i32,
  _srcAddress: Bytes,
  _nonce: BigInt,
  _payload: Bytes,
  _reason: Bytes
): MessageFailed {
  let messageFailedEvent = changetype<MessageFailed>(newMockEvent())

  messageFailedEvent.parameters = new Array()

  messageFailedEvent.parameters.push(
    new ethereum.EventParam(
      "_srcChainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_srcChainId))
    )
  )
  messageFailedEvent.parameters.push(
    new ethereum.EventParam(
      "_srcAddress",
      ethereum.Value.fromBytes(_srcAddress)
    )
  )
  messageFailedEvent.parameters.push(
    new ethereum.EventParam("_nonce", ethereum.Value.fromUnsignedBigInt(_nonce))
  )
  messageFailedEvent.parameters.push(
    new ethereum.EventParam("_payload", ethereum.Value.fromBytes(_payload))
  )
  messageFailedEvent.parameters.push(
    new ethereum.EventParam("_reason", ethereum.Value.fromBytes(_reason))
  )

  return messageFailedEvent
}

export function createNonContractAddressEvent(
  _address: Address
): NonContractAddress {
  let nonContractAddressEvent = changetype<NonContractAddress>(newMockEvent())

  nonContractAddressEvent.parameters = new Array()

  nonContractAddressEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )

  return nonContractAddressEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createReceiveFromChainEvent(
  _srcChainId: i32,
  _to: Address,
  _amount: BigInt
): ReceiveFromChain {
  let receiveFromChainEvent = changetype<ReceiveFromChain>(newMockEvent())

  receiveFromChainEvent.parameters = new Array()

  receiveFromChainEvent.parameters.push(
    new ethereum.EventParam(
      "_srcChainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_srcChainId))
    )
  )
  receiveFromChainEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  receiveFromChainEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return receiveFromChainEvent
}

export function createRetryMessageSuccessEvent(
  _srcChainId: i32,
  _srcAddress: Bytes,
  _nonce: BigInt,
  _payloadHash: Bytes
): RetryMessageSuccess {
  let retryMessageSuccessEvent = changetype<RetryMessageSuccess>(newMockEvent())

  retryMessageSuccessEvent.parameters = new Array()

  retryMessageSuccessEvent.parameters.push(
    new ethereum.EventParam(
      "_srcChainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_srcChainId))
    )
  )
  retryMessageSuccessEvent.parameters.push(
    new ethereum.EventParam(
      "_srcAddress",
      ethereum.Value.fromBytes(_srcAddress)
    )
  )
  retryMessageSuccessEvent.parameters.push(
    new ethereum.EventParam("_nonce", ethereum.Value.fromUnsignedBigInt(_nonce))
  )
  retryMessageSuccessEvent.parameters.push(
    new ethereum.EventParam(
      "_payloadHash",
      ethereum.Value.fromFixedBytes(_payloadHash)
    )
  )

  return retryMessageSuccessEvent
}

export function createSendToChainEvent(
  _dstChainId: i32,
  _from: Address,
  _toAddress: Bytes,
  _amount: BigInt
): SendToChain {
  let sendToChainEvent = changetype<SendToChain>(newMockEvent())

  sendToChainEvent.parameters = new Array()

  sendToChainEvent.parameters.push(
    new ethereum.EventParam(
      "_dstChainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_dstChainId))
    )
  )
  sendToChainEvent.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  sendToChainEvent.parameters.push(
    new ethereum.EventParam(
      "_toAddress",
      ethereum.Value.fromFixedBytes(_toAddress)
    )
  )
  sendToChainEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return sendToChainEvent
}

export function createSetDefaultFeeBpEvent(feeBp: i32): SetDefaultFeeBp {
  let setDefaultFeeBpEvent = changetype<SetDefaultFeeBp>(newMockEvent())

  setDefaultFeeBpEvent.parameters = new Array()

  setDefaultFeeBpEvent.parameters.push(
    new ethereum.EventParam(
      "feeBp",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(feeBp))
    )
  )

  return setDefaultFeeBpEvent
}

export function createSetFeeBpEvent(
  dstchainId: i32,
  enabled: boolean,
  feeBp: i32
): SetFeeBp {
  let setFeeBpEvent = changetype<SetFeeBp>(newMockEvent())

  setFeeBpEvent.parameters = new Array()

  setFeeBpEvent.parameters.push(
    new ethereum.EventParam(
      "dstchainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(dstchainId))
    )
  )
  setFeeBpEvent.parameters.push(
    new ethereum.EventParam("enabled", ethereum.Value.fromBoolean(enabled))
  )
  setFeeBpEvent.parameters.push(
    new ethereum.EventParam(
      "feeBp",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(feeBp))
    )
  )

  return setFeeBpEvent
}

export function createSetFeeOwnerEvent(feeOwner: Address): SetFeeOwner {
  let setFeeOwnerEvent = changetype<SetFeeOwner>(newMockEvent())

  setFeeOwnerEvent.parameters = new Array()

  setFeeOwnerEvent.parameters.push(
    new ethereum.EventParam("feeOwner", ethereum.Value.fromAddress(feeOwner))
  )

  return setFeeOwnerEvent
}

export function createSetMinDstGasEvent(
  _dstChainId: i32,
  _type: i32,
  _minDstGas: BigInt
): SetMinDstGas {
  let setMinDstGasEvent = changetype<SetMinDstGas>(newMockEvent())

  setMinDstGasEvent.parameters = new Array()

  setMinDstGasEvent.parameters.push(
    new ethereum.EventParam(
      "_dstChainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_dstChainId))
    )
  )
  setMinDstGasEvent.parameters.push(
    new ethereum.EventParam(
      "_type",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_type))
    )
  )
  setMinDstGasEvent.parameters.push(
    new ethereum.EventParam(
      "_minDstGas",
      ethereum.Value.fromUnsignedBigInt(_minDstGas)
    )
  )

  return setMinDstGasEvent
}

export function createSetPrecrimeEvent(precrime: Address): SetPrecrime {
  let setPrecrimeEvent = changetype<SetPrecrime>(newMockEvent())

  setPrecrimeEvent.parameters = new Array()

  setPrecrimeEvent.parameters.push(
    new ethereum.EventParam("precrime", ethereum.Value.fromAddress(precrime))
  )

  return setPrecrimeEvent
}

export function createSetTrustedRemoteEvent(
  _remoteChainId: i32,
  _path: Bytes
): SetTrustedRemote {
  let setTrustedRemoteEvent = changetype<SetTrustedRemote>(newMockEvent())

  setTrustedRemoteEvent.parameters = new Array()

  setTrustedRemoteEvent.parameters.push(
    new ethereum.EventParam(
      "_remoteChainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_remoteChainId))
    )
  )
  setTrustedRemoteEvent.parameters.push(
    new ethereum.EventParam("_path", ethereum.Value.fromBytes(_path))
  )

  return setTrustedRemoteEvent
}

export function createSetTrustedRemoteAddressEvent(
  _remoteChainId: i32,
  _remoteAddress: Bytes
): SetTrustedRemoteAddress {
  let setTrustedRemoteAddressEvent = changetype<SetTrustedRemoteAddress>(
    newMockEvent()
  )

  setTrustedRemoteAddressEvent.parameters = new Array()

  setTrustedRemoteAddressEvent.parameters.push(
    new ethereum.EventParam(
      "_remoteChainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_remoteChainId))
    )
  )
  setTrustedRemoteAddressEvent.parameters.push(
    new ethereum.EventParam(
      "_remoteAddress",
      ethereum.Value.fromBytes(_remoteAddress)
    )
  )

  return setTrustedRemoteAddressEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
