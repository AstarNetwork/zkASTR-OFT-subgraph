import {
  Approval as ApprovalEvent,
  CallOFTReceivedSuccess as CallOFTReceivedSuccessEvent,
  MessageFailed as MessageFailedEvent,
  NonContractAddress as NonContractAddressEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  ReceiveFromChain as ReceiveFromChainEvent,
  RetryMessageSuccess as RetryMessageSuccessEvent,
  SendToChain as SendToChainEvent,
  SetDefaultFeeBp as SetDefaultFeeBpEvent,
  SetFeeBp as SetFeeBpEvent,
  SetFeeOwner as SetFeeOwnerEvent,
  SetMinDstGas as SetMinDstGasEvent,
  SetPrecrime as SetPrecrimeEvent,
  SetTrustedRemote as SetTrustedRemoteEvent,
  SetTrustedRemoteAddress as SetTrustedRemoteAddressEvent,
  Transfer as TransferEvent,
  Unpaused as UnpausedEvent
} from "../generated/Astar/Astar"
import { Address, BigInt } from "@graphprotocol/graph-ts"
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
  Unpaused,
  UserHolding
} from "../generated/schema"

const SNAPSHOT_BLOCK_NUMBER = "1860738" // May 1st 2024
enum Operation {
  ADD,
  SUBTRACT
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCallOFTReceivedSuccess(
  event: CallOFTReceivedSuccessEvent
): void {
  let entity = new CallOFTReceivedSuccess(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._srcChainId = event.params._srcChainId
  entity._srcAddress = event.params._srcAddress
  entity._nonce = event.params._nonce
  entity._hash = event.params._hash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMessageFailed(event: MessageFailedEvent): void {
  let entity = new MessageFailed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._srcChainId = event.params._srcChainId
  entity._srcAddress = event.params._srcAddress
  entity._nonce = event.params._nonce
  entity._payload = event.params._payload
  entity._reason = event.params._reason

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNonContractAddress(event: NonContractAddressEvent): void {
  let entity = new NonContractAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._address = event.params._address

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReceiveFromChain(event: ReceiveFromChainEvent): void {
  let entity = new ReceiveFromChain(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._srcChainId = event.params._srcChainId
  entity._to = event.params._to
  entity._amount = event.params._amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  if (event.block.number <= BigInt.fromString(SNAPSHOT_BLOCK_NUMBER)) {
    updateUserBridgeInfo(event.params._to, event.params._amount, Operation.ADD);
  }
  entity.save()
}

export function handleRetryMessageSuccess(
  event: RetryMessageSuccessEvent
): void {
  let entity = new RetryMessageSuccess(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._srcChainId = event.params._srcChainId
  entity._srcAddress = event.params._srcAddress
  entity._nonce = event.params._nonce
  entity._payloadHash = event.params._payloadHash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSendToChain(event: SendToChainEvent): void {
  let entity = new SendToChain(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._dstChainId = event.params._dstChainId
  entity._from = event.params._from
  entity._toAddress = event.params._toAddress
  entity._amount = event.params._amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  if (event.block.number <= BigInt.fromString(SNAPSHOT_BLOCK_NUMBER)) {
    updateUserBridgeInfo(event.params._from, event.params._amount, Operation.SUBTRACT);
  }
  entity.save()
}

export function handleSetDefaultFeeBp(event: SetDefaultFeeBpEvent): void {
  let entity = new SetDefaultFeeBp(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.feeBp = event.params.feeBp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetFeeBp(event: SetFeeBpEvent): void {
  let entity = new SetFeeBp(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.dstchainId = event.params.dstchainId
  entity.enabled = event.params.enabled
  entity.feeBp = event.params.feeBp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetFeeOwner(event: SetFeeOwnerEvent): void {
  let entity = new SetFeeOwner(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.feeOwner = event.params.feeOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetMinDstGas(event: SetMinDstGasEvent): void {
  let entity = new SetMinDstGas(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._dstChainId = event.params._dstChainId
  entity._type = event.params._type
  entity._minDstGas = event.params._minDstGas

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetPrecrime(event: SetPrecrimeEvent): void {
  let entity = new SetPrecrime(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.precrime = event.params.precrime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetTrustedRemote(event: SetTrustedRemoteEvent): void {
  let entity = new SetTrustedRemote(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._remoteChainId = event.params._remoteChainId
  entity._path = event.params._path

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetTrustedRemoteAddress(
  event: SetTrustedRemoteAddressEvent
): void {
  let entity = new SetTrustedRemoteAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._remoteChainId = event.params._remoteChainId
  entity._remoteAddress = event.params._remoteAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  if (event.block.number <= BigInt.fromString(SNAPSHOT_BLOCK_NUMBER)) {
    updateUserAstrHoldings(event.params.to, event.params.value, Operation.ADD);
    updateUserAstrHoldings(event.params.from, event.params.value, Operation.SUBTRACT);
  }
  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

function updateUserAstrHoldings(user: Address, holding: BigInt, operation: Operation): void {
  if (user.toHexString() == "0x0000000000000000000000000000000000000000") return;

  let userHolding = UserHolding.load(user);
  if (userHolding == null) {
    userHolding = new UserHolding(user);
    userHolding.holding = BigInt.fromI32(0);
    userHolding.bridgedIn = BigInt.fromI32(0);
    userHolding.bridgedOut = BigInt.fromI32(0);
  }

  if (operation === Operation.ADD) {
    userHolding.holding = userHolding.holding.plus(holding);
  } else if (operation === Operation.SUBTRACT) {
    userHolding.holding = userHolding.holding.minus(holding);
  }

  userHolding.save();
}

function updateUserBridgeInfo(user: Address, amount: BigInt, operation: Operation): void {
  if (user.toHexString() == "0x0000000000000000000000000000000000000000") return;

  let userHolding = UserHolding.load(user);
  if (userHolding == null) {
    userHolding = new UserHolding(user);
    userHolding.holding = BigInt.fromI32(0);
    userHolding.bridgedIn = BigInt.fromI32(0);
    userHolding.bridgedOut = BigInt.fromI32(0);
  }

  if (operation === Operation.ADD) {
    userHolding.bridgedIn = userHolding.bridgedIn.plus(amount);
  } else if (operation === Operation.SUBTRACT) {
    userHolding.bridgedOut = userHolding.bridgedOut.plus(amount);
  }

  userHolding.save();
}