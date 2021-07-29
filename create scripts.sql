-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.5.5-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for web-inventory
CREATE DATABASE IF NOT EXISTS `web-inventory` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `web-inventory`;

CREATE USER IF NOT EXISTS 'bicon'@'%' IDENTIFIED BY '@buino';
GRANT ALL PRIVILEGES ON `web-inventory`.* TO 'bicon'@'%';

-- Dumping structure for table web-inventory.address
CREATE TABLE IF NOT EXISTS `address` (
  `Id` varchar(10) NOT NULL,
  `HouseNo` varchar(100) DEFAULT NULL,
  `Street` varchar(100) DEFAULT NULL,
  `City` varchar(20) DEFAULT NULL,
  `State` varchar(20) DEFAULT NULL,
  `Country` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table web-inventory.clients
CREATE TABLE IF NOT EXISTS `clients` (
  `ClientId` varchar(10) NOT NULL,
  `ClientLastName` varchar(20) DEFAULT NULL,
  `ClientFirstName` varchar(20) DEFAULT NULL,
  `ClientOtherName` varchar(20) DEFAULT NULL,
  `ClientCompanyName` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  PRIMARY KEY (`ClientId`),
  CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `address` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table web-inventory.products
CREATE TABLE IF NOT EXISTS `products` (
  `ProductId` varchar(10) NOT NULL,
  `ProductName` varchar(100) DEFAULT NULL,
  `productCategory` varchar(50) DEFAULT NULL,
  `SupplierId` varchar(10) DEFAULT NULL,
  `ProductCostPrice` varchar(50) DEFAULT NULL,
  `ProductSellingPrice` float DEFAULT NULL,
  `CurrentQuantity` int(11) DEFAULT NULL,
  `MinimumRequired` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  PRIMARY KEY (`ProductId`),
  KEY `products_ibfk_1` (`SupplierId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table web-inventory.purchases
CREATE TABLE IF NOT EXISTS `purchases` (
  `PurchaseId` varchar(10) NOT NULL,
  `InvoiceNo` varchar(10) DEFAULT NULL,
  `SupplierId` varchar(10) DEFAULT NULL,
  `PurchaseItemsDetails` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `PurchaseDate` date DEFAULT NULL,
  `PurchaseAmount` varchar(50) DEFAULT NULL,
  `PurchaseDiscount` varchar(50) DEFAULT NULL,
  `TotalVAT` varchar(50) DEFAULT NULL,
  `AmountDue` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`PurchaseId`),
  KEY `purchases_ibfk_1` (`SupplierId`),
  CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`SupplierId`) REFERENCES `suppliers` (`SupplierId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table web-inventory.sales
CREATE TABLE IF NOT EXISTS `sales` (
  `Id` varchar(10) NOT NULL,
  `InvoiceNo` varchar(10) NOT NULL,
  `SalesItemsDetails` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `SalesAmount` varchar(50) DEFAULT NULL,
  `SalesDiscount` varchar(50) DEFAULT NULL,
  `TotalVAT` varchar(50) DEFAULT NULL,
  `ClientId` varchar(50) DEFAULT NULL,
  `SalesDate` date DEFAULT NULL,
  `AmountDue` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `sales_ibfk_1` (`ClientId`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`ClientId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table web-inventory.suppliers
CREATE TABLE IF NOT EXISTS `suppliers` (
  `SupplierId` varchar(10) NOT NULL,
  `supplierLastName` varchar(20) DEFAULT NULL,
  `SupplierFirstName` varchar(20) DEFAULT NULL,
  `SupplierOtherName` varchar(20) DEFAULT NULL,
  `SupplierCompanyName` varchar(50) DEFAULT NULL,
  `SupplierCompanyEmail` varchar(50) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  PRIMARY KEY (`SupplierId`),
  CONSTRAINT `suppliers_ibfk_1` FOREIGN KEY (`SupplierId`) REFERENCES `address` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table web-inventory.users
CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(20) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `Role` varchar(10) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
