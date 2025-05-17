pub const MARKET_VERSION: u8 = 1;
pub const MAX_RESERVES: usize = 32;
pub const MAX_OBLIGATIONS: usize = 32;
pub const MAX_DEPOSITS: usize = 8;
pub const MAX_BORROWS: usize = 8;

// Interest rate parameters
pub const MIN_BORROW_RATE: u8 = 1; // 0.01%
pub const OPTIMAL_BORROW_RATE: u8 = 5; // 0.05%
pub const MAX_BORROW_RATE: u8 = 20; // 0.20%

// Collateral parameters
pub const DEFAULT_LTV: u8 = 75; // 75%
pub const DEFAULT_LIQUIDATION_THRESHOLD: u8 = 80; // 80%
pub const DEFAULT_LIQUIDATION_BONUS: u8 = 5; // 5%

// Fee parameters
pub const DEFAULT_BORROW_FEE: u8 = 1; // 0.01%
pub const DEFAULT_FLASH_LOAN_FEE: u8 = 9; // 0.09%
pub const DEFAULT_HOST_FEE: u8 = 20; // 0.20%

// Time parameters
pub const SLOTS_PER_YEAR: u64 = 63072000; // 2 slots per second
pub const SECONDS_PER_YEAR: u64 = 31536000;

// Price parameters
pub const PRICE_SCALE: u64 = 1_000_000_000; // 1e9
pub const PRICE_PRECISION: u8 = 9;