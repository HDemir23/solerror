# Failed Solana Mainnet Transaction Signatures for Error Decoder Testing

This document contains real failed mainnet transaction signatures with specific custom error codes for testing a Solana error decoder library.

## Error Code Reference

### System Program (11111111111111111111111111111111)
- **0**: AccountAlreadyInUse - An account with the same address already exists
- **1**: ResultWithNegativeLamports - Account does not have enough SOL to perform the operation
- **2**: InvalidProgramId - Cannot assign account to this program id
- **3**: InvalidAccountDataLength - Cannot allocate account data of this length
- **4**: MaxSeedLengthExceeded - Length of requested seed is too long
- **5**: AddressWithSeedMismatch - Provided address does not match address derived from seed
- **6**: NonceNoRecentBlockhashes - Advancing stored nonce requires a populated RecentBlockhashes sysvar
- **7**: NonceBlockhashNotExpired - Stored nonce is still in recent_blockhashes
- **8**: NonceUnexpectedBlockhashValue - Specified nonce does not match stored nonce

### SPL Token Program (TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA)
- **0**: NotRentExempt - Lamport balance below rent-exempt threshold
- **1**: InsufficientFunds - Insufficient funds for the operation requested
- **2**: InvalidMint - Invalid Mint
- **3**: MintMismatch - Account not associated with this Mint
- **4**: OwnerMismatch - Owner does not match
- **5**: FixedSupply - This token's supply is fixed and new tokens cannot be minted
- **6**: AlreadyInUse - The account cannot be initialized because it is already being used
- **7**: InvalidNumberOfProvidedSigners - Invalid number of provided signers
- **8**: InvalidNumberOfRequiredSigners - Invalid number of required signers
- **9**: UninitializedState - State is uninitialized
- **10**: NativeNotSupported - Instruction does not support native tokens
- **11**: NonNativeHasBalance - Non-native account can only be closed if its balance is zero
- **12**: InvalidInstruction - Invalid instruction
- **13**: InvalidState - State is invalid for requested operation
- **14**: Overflow - Operation overflowed
- **15**: AuthorityTypeNotSupported - Account does not support specified authority type
- **16**: MintCannotFreeze - This token mint cannot freeze accounts
- **17**: AccountFrozen - Account is frozen; all account operations will fail
- **18**: MintDecimalsMismatch - Mint decimals mismatch between the client and mint
- **19**: NonNativeNotSupported - Instruction does not support non-native tokens

### Stake Program (Stake11111111111111111111111111111111111111)
- **0**: NoCreditsToRedeem - Not enough credits to redeem
- **1**: LockupInForce - Lockup has not yet expired
- **2**: AlreadyDeactivated - Stake already deactivated
- **3**: TooSoonToRedelegate - One re-delegation permitted per epoch
- **4**: InsufficientStake - Split amount is more than is staked
- **5**: MergeTransientStake - Stake account with transient stake cannot be merged
- **6**: MergeMismatch - Stake account merge failed due to different authority, lockups or state
- **7**: CustodianMissing - Custodian address not present
- **8**: CustodianSignatureMissing - Custodian signature not present
- **9**: InsufficientReferenceVotes - Insufficient voting activity in the reference vote account
- **10**: VoteAddressMismatch - Stake account is not delegated to the provided vote account
- **11**: MinimumDelinquentEpochsForDeactivationNotMet - Stake account has not been delinquent for the minimum epochs required for deactivation
- **12**: InsufficientDelegation - Delegation amount is less than the minimum
- **13**: RedelegateTransientOrInactiveStake - Stake account with transient or inactive stake cannot be redelegated
- **14**: RedelegateToSameVoteAccount - Stake redelegation to the same vote account is not permitted
- **15**: RedelegatedStakeMustFullyActivateBeforeDeactivationIsPermitted - Redelegated stake must be fully activated before deactivation

---

## Failed Transaction Signatures

### System Program Transactions

#### System Program - ResultWithNegativeLamports (code 1)
- **Signature**: RNkzXiaXyZn6jozq8R22WwK6qWwAT6kY9GBVgTP2TRo4GtpySeYAhr89GBigkxMQeYeu9wjDZBpDHxaPxn8gses
- **Description**: Grass token transfer failed due to insufficient lamports in the account. The system program reported "insufficient lamports 895600, need 2039280".
- **Explorer**: https://solscan.io/tx/RNkzXiaXyZn6jozq8R22WwK6qWwAT6kY9GBVgTP2TRo4GtpySeYAhr89GBigkxMQeYeu9wjDZBpDHxaPxn8gses
- **Error Log**: "Transfer: insufficient lamports 895600, need 2039280" followed by "custom program error: 0x1"

### SPL Token Program Transactions

#### SPL Token Program - InvalidInstruction (code 12) / Token 2022 specific
- **Signature**: 5f8TbBiz7HpJAFyCMC6tpc4NmGAfBQ2CuoZL3X1BGKznvYYoQFSpdzrjg6X2yxyyd2msCs5TVN2RJwjp
- **Description**: PumpFun token transfer failed when using the wrong instruction (Transfer instead of TransferChecked) for Token 2022. The error 0x1f (31 decimal) indicates a Token 2022 specific error.
- **Explorer**: https://solscan.io/tx/5f8TbBiz7HpJAFyCMC6tpc4NmGAfBQ2CuoZL3X1BGKznvYYoQFSpdzrjg6X2yxyyd2msCs5TVN2RJwjp
- **Error Log**: "Program logged: Mint required for this account to transfer tokens, use `transfer_checked` or `transfer_checked_with_fee`"

- **Signature**: 3X2qTY693VV5zqcx1fWXDo855SChnF7s56QF2M71MDTHAwgBpCayx3rQ3NtHwqPYzEtTAWpTDt7XX9y9s3Cxxf
- **Description**: Another failed PumpFun token transfer with the same issue - using Transfer instead of TransferChecked for Token 2022.
- **Explorer**: https://solscan.io/tx/3X2qTY693VV5zqcx1fWXDo855SChnF7s56QF2M71MDTHAwgBpCayx3rQ3NtHwqPYzEtTAWpTDt7XX9y9s3Cxxf

### Other Program Transactions (for reference)

#### PumpFun/Jupiter - Custom Error 0x1772 (decimal 6034)
- **Signature**: 2j5RteS35ELmJKyNh9tRaKmBQQTpJeNx3s1tUYTRkPjAPiM4arxKFRt63dFyD4dZn5Cx1DkEwn7br5YB4XHHnACw
- **Description**: PumpFun swap transaction failed with custom error 0x1772 (6034 decimal) from a proprietary program. This appears to be a Jupiter swap related error.
- **Related Signatures**: 
  - 2mTGemsyD8dsSPxDKGgenSfrUTcUg9cdkZAdUeF8xq4HEMQoMn5vQm1G73exk8Uv1GmUx8DGj46Wuqqyft8fjRxZ
  - 15dxCTAqzx3ujCno6xbfttmiPDzRShNKrypK8K2rd576YGivhNTTueXS37rtXZK5Xcc37izX6aXrXp2qhhx2oXh
  - 3Vq17GPy8kLGHCSnQx3q1zKwjhJfros2jrdoksayd7RHnEyvJSDGK4CdoYpcWPm7oU1SUVLcyVLJTkzn7nFD8j6h
- **Error**: "Error processing Instruction 1: custom program error: 0x1772"

#### Raydium AMM - InvalidUserToken (code 42 / 0x2a)
- **Signature**: (from logs, full signature not provided in source)
- **Description**: Raydium swap failed because user token input does not match the AMM. Error 0x2a is decimal 42 (InvalidUserToken).
- **Error Log**: "Program log: Error: User token input does not match amm"

---

## Testing Your Error Decoder

To test your error decoder with these transactions, use the following CLI commands:

### Using Solana CLI
```bash
# Get detailed transaction logs
solana confirm <SIGNATURE> -v

# Get transaction details in JSON
solana transaction <SIGNATURE> --output json
```

### Using RPC
```bash
curl -X POST https://api.mainnet-beta.solana.com \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getTransaction",
    "params": [
      "<SIGNATURE>",
      {"encoding": "jsonParsed"}
    ]
  }'
```

### Expected Error Format
Your decoder should parse errors in this format:
```json
{
  "err": {
    "InstructionError": [
      <instruction_index>,
      {
        "Custom": <error_code>
      }
    ]
  }
}
```

### Example Test Cases

1. **Test System Program error 1**:
```bash
solana confirm RNkzXiaXyZn6jozq8R22WwK6qWwAT6kY9GBVgTP2TRo4GtpySeYAhr89GBigkxMQeYeu9wjDZBpDHxaPxn8gses -v
```
Expected: Should decode to "ResultWithNegativeLamports - Account does not have enough SOL to perform the operation"

2. **Test Token 2022 error**:
```bash
solana confirm 5f8TbBiz7HpJAFyCMC6tpc4NmGAfBQ2CuoZL3X1BGKznvYYoQFSpdzrjg6X2yxyyd2msCs5TVN2RJwjp -v
```
Expected: Should identify as Token 2022 specific error and provide appropriate guidance

---

## Sources

1. **Solana System Program Source**: https://github.com/solana-labs/solana/blob/master/sdk/program/src/system_instruction.rs
2. **SPL Token Documentation**: https://docs.rs/spl-token/latest/spl_token/error/enum.TokenError.html
3. **Stake Program Source**: https://github.com/solana-program/stake/blob/main/interface/src/error.rs
4. **Solana Stack Exchange**: Various questions about specific error codes
5. **Understanding Solana Errors**: https://www.juanrdbo.com/blog/solana-error-decoding

---

## Notes

- All error codes are **zero-indexed** (0-8 for System Program, 0-19 for SPL Token, 0-15 for Stake Program)
- Error codes 0x0-0x8 typically map to System Program errors
- Error codes 0x0-0x13 typically map to SPL Token errors
- Error codes 0x0-0xf typically map to Stake Program errors
- Custom errors beyond these ranges (like 0x1772, 0x6000+) are from third-party programs
- Always verify which program reported the error by checking the instruction index in the error response

## Contributing

To add more failed transaction signatures to this list:
1. Use Solscan, Solana Explorer, or SolanaFM to search for failed transactions
2. Look for transactions with `InstructionError` in their logs
3. Extract the signature, error code, and error message
4. Verify which program caused the error
5. Add to this document following the format above
