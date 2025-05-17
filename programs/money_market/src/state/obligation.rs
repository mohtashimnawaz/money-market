use anchor_lang::prelude::*;

#[account]
pub struct Obligation {
    pub owner: Pubkey,
    pub market: Pubkey,
    pub deposits: Vec<Deposit>,
    pub borrows: Vec<Borrow>,
    pub deposited_value: u64,
    pub borrowed_value: u64,
    pub allowed_borrow_value: u64,
    pub unhealthy_borrow_value: u64,
    pub last_update_timestamp: i64,
    pub last_update_slot: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Deposit {
    pub reserve: Pubkey,
    pub amount: u64,
    pub market_value: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Borrow {
    pub reserve: Pubkey,
    pub amount: u64,
    pub market_value: u64,
    pub cumulative_borrow_rate: u64,
}

impl Obligation {
    pub const LEN: usize = 32 + 32 + 8 + 8 + 8 + 8 + 8 + 8 + 8 + 8;
}