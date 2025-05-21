-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 21, 2025 at 01:29 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cwsms`
--

-- --------------------------------------------------------

--
-- Table structure for table `CAR`
--

CREATE TABLE `CAR` (
  `PlateNumber` varchar(20) NOT NULL,
  `CarType` varchar(50) NOT NULL,
  `CarSize` varchar(30) NOT NULL,
  `DriverName` varchar(100) NOT NULL,
  `PhoneNumber` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `CAR`
--

INSERT INTO `CAR` (`PlateNumber`, `CarType`, `CarSize`, `DriverName`, `PhoneNumber`) VALUES
('122', 'fff', '1223', 'usea', '0798299281'),
('ABC-1234', 'Sedan', 'Medium', 'John Smith', '555-123-4567'),
('DEF-5678', 'Compact', 'Small', 'Michael Brown', '555-567-8901');

-- --------------------------------------------------------

--
-- Table structure for table `PACKAGE`
--

CREATE TABLE `PACKAGE` (
  `PackageNumber` int(11) NOT NULL,
  `PackageName` varchar(100) NOT NULL,
  `PackageDescription` text DEFAULT NULL,
  `PackagePrice` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `PACKAGE`
--

INSERT INTO `PACKAGE` (`PackageNumber`, `PackageName`, `PackageDescription`, `PackagePrice`) VALUES
(1, 'Basic Wash', 'Exterior car wash and vacuum', 25.99),
(2, 'Standard Service', 'Oil change, filter replacement, and fluid check', 89.99),
(3, 'Premium Package', 'Full service including detailing and waxing', 149.99);

-- --------------------------------------------------------

--
-- Table structure for table `PAYMENT`
--

CREATE TABLE `PAYMENT` (
  `PaymentNumber` int(11) NOT NULL,
  `AmountPaid` decimal(10,2) NOT NULL,
  `PaymentDate` date NOT NULL,
  `RecordNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SERVICE_PACKAGE`
--

CREATE TABLE `SERVICE_PACKAGE` (
  `RecordNumber` int(11) NOT NULL,
  `SeviceDate` date NOT NULL,
  `PackageNumber` int(11) NOT NULL,
  `PlateNumber` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `USER`
--

CREATE TABLE `USER` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `USER`
--

INSERT INTO `USER` (`UserID`, `Username`, `Password`) VALUES
(1, 'admin ', '$2a$12$PpvOQujqBIPAFDaKLlHzFem4ZIn/RfAruUEvW.ZbaxfmzbsarFneG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CAR`
--
ALTER TABLE `CAR`
  ADD PRIMARY KEY (`PlateNumber`);

--
-- Indexes for table `PACKAGE`
--
ALTER TABLE `PACKAGE`
  ADD PRIMARY KEY (`PackageNumber`);

--
-- Indexes for table `PAYMENT`
--
ALTER TABLE `PAYMENT`
  ADD PRIMARY KEY (`PaymentNumber`),
  ADD KEY `RecordNumber` (`RecordNumber`);

--
-- Indexes for table `SERVICE_PACKAGE`
--
ALTER TABLE `SERVICE_PACKAGE`
  ADD PRIMARY KEY (`RecordNumber`),
  ADD KEY `PackageNumber` (`PackageNumber`),
  ADD KEY `PlateNumber` (`PlateNumber`);

--
-- Indexes for table `USER`
--
ALTER TABLE `USER`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `PACKAGE`
--
ALTER TABLE `PACKAGE`
  MODIFY `PackageNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `PAYMENT`
--
ALTER TABLE `PAYMENT`
  MODIFY `PaymentNumber` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SERVICE_PACKAGE`
--
ALTER TABLE `SERVICE_PACKAGE`
  MODIFY `RecordNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `USER`
--
ALTER TABLE `USER`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `PAYMENT`
--
ALTER TABLE `PAYMENT`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`RecordNumber`) REFERENCES `SERVICE_PACKAGE` (`RecordNumber`);

--
-- Constraints for table `SERVICE_PACKAGE`
--
ALTER TABLE `SERVICE_PACKAGE`
  ADD CONSTRAINT `service_package_ibfk_1` FOREIGN KEY (`PackageNumber`) REFERENCES `PACKAGE` (`PackageNumber`),
  ADD CONSTRAINT `service_package_ibfk_2` FOREIGN KEY (`PlateNumber`) REFERENCES `CAR` (`PlateNumber`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
