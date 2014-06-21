ALTER TABLE `products` ADD COLUMN `price` DECIMAL(15,2) DEFAULT NULL;
ALTER TABLE `products` ADD COLUMN `province` CHAR(6) DEFAULT NULL;
ALTER TABLE `products` ADD COLUMN `city` CHAR(64) DEFAULT NULL;
ALTER TABLE `products` ADD INDEX `cityidx` (`city`(10));
ALTER TABLE `products` ADD INDEX `provinceidx` (`province`(2));
