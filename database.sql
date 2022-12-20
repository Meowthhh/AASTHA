-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Nov 25, 2022 at 03:07 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aastha`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_us`
--

CREATE TABLE `about_us` (
  `about_us` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `about_us`
--

INSERT INTO `about_us` (`about_us`) VALUES
('Aastha,Blood Bank Management System,is a browser based solution that is designed to store,process, retrieve and analyze information concerned with the administrative, inventory\r\nmanagement and clinical aspects of providing services within a blood bank.The application allows the users to store the donor details in the\r\napplication itself.System allows the user to store physical and medical\r\ndetails of the donor at the time of the registration.Aastha is an energency management service that helps people to search for blood during medical emergencies');

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `division` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `division`, `district`, `city`) VALUES
(1, 'Dhaka', 'Dhaka', 'Mirpur'),
(2, 'Dhaka', 'Dhaka', 'Banani'),
(3, 'Dhaka', 'Dhaka', 'Gulshan'),
(4, 'Dhaka', 'Gazipur', 'Boardbazar'),
(5, 'Khulna', 'Khulna', 'Rupsha');

-- --------------------------------------------------------

--
-- Table structure for table `add_blood_requst`
--

CREATE TABLE `add_blood_requst` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `time` date NOT NULL DEFAULT current_timestamp(),
  `pname` varchar(255) NOT NULL,
  `c_number` text NOT NULL,
  `complications` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `b_g` varchar(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `add_requirement` varchar(255) DEFAULT NULL,
  `organization` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `my_donation`
--

CREATE TABLE `my_donation` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pname` varchar(255) NOT NULL,
  `cname` varchar(255) NOT NULL,
  `c_number` int(12) NOT NULL,
  `complications` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `organization` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `my_donation`
--

INSERT INTO `my_donation` (`id`, `email`, `pname`, `cname`, `c_number`, `complications`, `date`, `organization`, `address`) VALUES
(4, 'tahmid@gmail.com', 'Rakin Absar', 'Sakif Ahbab', 1771089194, 'come before 1a.m', '2022-11-29', 'Dhaka Medical', 'Dhaka');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fname`, `lname`, `email`, `password`) VALUES
(38, 'Rakin', 'Abrar', 'rakinabrar126@gmail.com', '$2a$08$DbkOrTAAI9.rwjMJejAI9eX3YB1v./s/Ie5ps0SgfnLcqUnUxroIi'),
(39, 'Rakin', 'Abrar', 'rakinabrar123@gmail.com', '$2a$08$GqH0IzBN2hj0GkQ15VSb7uKlKr/7XHKBPCUp1pl9Y3jBTDoJB0aai'),
(40, 'Sabah ', 'Nushra', 'sabah.nushra@gmail.com', '$2a$08$U6ebc8zHvvKQ.8Yh2LJwe.vd7mKf1njQPm.cfje0X5ulJ5phXgHxe'),
(43, 'Tahmid', 'Rahman', 'tahmid@gmail.com', '$2a$08$92oGra8yT0xJnMh3/wsdv.FKch3NVjN9cscYgB9tbKLxqNJNaN7C2'),
(44, 'Prottoy', 'Rafi', 'rafi@gmail.com', '$2a$08$PdALh30f.WQ0bUjaf584EOIAwDCh2JLAW5iADGLg4ehWrmmkDGsSi'),
(45, 'Rafid Nahiyan', 'Farabi', 'farabi@gmail.com', '$2a$08$cWoV/HJLi/L4z5y.fCYr4Or.kzb1FEGPtjOg2RxMx0GIVikc/gOyu');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `f_name` varchar(30) NOT NULL,
  `l_name` varchar(30) NOT NULL,
  `c_number` varchar(30) NOT NULL,
  `address` varchar(150) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `profession` varchar(60) DEFAULT NULL,
  `d_o_b` varchar(100) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `password` varchar(60) NOT NULL,
  `passwordConfirm` varchar(60) NOT NULL,
  `bg` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`f_name`, `l_name`, `c_number`, `address`, `email`, `profession`, `d_o_b`, `age`, `gender`, `password`, `passwordConfirm`, `bg`) VALUES
('md', 'sayem', '01621786508', 'Dhaka ', 'BMS@gmail.com', 'software Developer ', '20 dec', 21, 'male', '$2a$08$lDhkcMpwfvJuTFOaSoSuY.mRd8BIlj2osVxMCpsvDgeWZmTeoC8G.', 'iopjkl', '0+'),
('Fahim', 'Khan', '01837453892', 'Dhaka ', 'Fahim@gmail.com', 'software Developer ', '12 jan', 23, 'male', '$2a$08$3XVjMCHx/W41c0Q2G11RCOpsgxZctOVfbhfAco1HrMfRjnajC9Toa', '12345', 'B-'),
('md', 'sayem', '01621786509', 'Dhaka ', 'md1040582@gmail.com', 'software Developer ', '20 dec', 21, 'male', '$2a$08$LupjLg4jnF0eKsc1e3wSneDXHVXI37qDejUzQWbwhax5HgZXw0YTy', 'iopjkl', '0+'),
('mahin', 'abrar', '01771089194', 'dhaka', 'rakin123@gmail.com', 'student', '14-02-2002', 20, 'male', '$2a$08$r.ibbocv.y09FooeCd6oGOhm6i6OtsN1wvM.i6w35m21Ki9qTK1ey', '1234', 'o-'),
('rakin', 'abrar', '01771089194', 'dhaka', 'rakin1@gmail.com', 'student', '14-02-2002', 20, 'male', '$2a$08$Pq2sb.I3iStDKimMtzSRSOYKkKCQLKxoZrmVQQ19teHUw0Aha.zvy', '1234', '0-'),
('rakin', 'fff', '01771089194', '531/A West Shewrapara', 'rakin2345@gmail.com', 'student', '14-02-2002', 24, 'male', '$2a$08$l43kPv658.ZdRpzh9efDx.j93i3/Pjoo7ZvgAgqKd.W18zEgOYw5i', '1234', '0-'),
('rakin', 'fff', '01771089194', '531/A West Shewrapara', 'rakin234@gmail.com', 'student', '14-02-2002', 24, 'male', '$2a$08$invkSoCQjNc5I86KI2vLZOIfNeYhfWuiCJP0/GVxEjGzvnLKUL.iG', '1234', '0-'),
('rakin', 'fff', '01771089194', '531/A West Shewrapara', 'rakin23@gmail.com', 'student', '14-02-2002', 24, 'male', '$2a$08$C7eiFdmPm4HVnZ4MIPIfiuP1Lx1NybrRd06leS8E9KpIrDdFutsWq', '1234', '0-'),
('Rakin', 'Khan', '01988346272', 'Dhaka ', 'RakinKhan@gmail.com', 'software Developer ', '12 jan', 22, 'male', '$2a$08$WCwQ.ivaOlw5HTrKP/EbbeCmJmRleFIfR/Z2qx9JUNjvQc.DP3zTG', '12345', 'o+'),
('Rakin', 'AB', '01837453892', 'Rajshahi', 'Rakin_Ab@gmail.com', 'software Developer ', '20 dec', 23, 'male', '$2a$08$wA.EnqR3R3IckuybgrwZ.eAcyslmIIPekUfrO0kr4NRH/ynz3kPPe', '1234', 'B-'),
('Zarif', 'Khan', '01785746537', 'Rajshahi', 'Zarf@gmail.com', 'software Developer ', '12 jan', 22, 'male', '$2a$08$vg8yxPViNU9z84OvfOLsKOTAaXt4L2CFjMPkZfbai.gT9iXOFCFj6', '123456', 'o-');

-- --------------------------------------------------------

--
-- Table structure for table `users_image`
--

CREATE TABLE `users_image` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `c_number` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profession` varchar(255) NOT NULL,
  `b_g` varchar(20) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `division` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`id`, `fname`, `lname`, `c_number`, `email`, `profession`, `b_g`, `dob`, `gender`, `address`, `street`, `zip`, `division`, `district`, `city`, `img`) VALUES
(19, 'Rakin', 'Abrar', '01771089194', 'rakinabrar126@gmail.com', 'Doctor', 'O+', '2002-02-14', 'Male', '531/A West Shewrapara', '', NULL, 'Dhaka', 'Dhaka', 'Mirpur', '1669217065700.png'),
(20, 'Tanvir', 'Saikat', '01771089194', 'rakinabrar123@gmail.com', 'Student', 'O+', '2002-02-14', 'Male', '531/A West Shewrapara', '', '1216', 'Dhaka', 'Dhaka', 'Banani', '1669294970096.png'),
(21, 'Sabah ', 'Nushra', '01771089194', 'sabah.nushra@gmail.com', 'Student', 'A+', '2002-11-24', 'female', '531/A West Shewrapara', '', NULL, 'Dhaka', 'Dhaka', 'Banani', '1669217459928.png'),
(24, 'Tahmid', 'Rahman', '01771089194', 'tahmid@gmail.com', 'Student', 'O+', '2002-02-09', 'Male', '531/A West Shewrapara', '', '531/A West Shewrapara', 'Dhaka', 'Dhaka', 'Banani', '1669275193748.png'),
(25, 'Prottoy', 'Rafi', '01771089194', 'rafi@gmail.com', 'Engineer', 'A+', '2002-02-10', 'Male', '531/A West Shewrapara', '', NULL, 'Dhaka', 'Dhaka', 'Gulshan', '1669275376168.png'),
(26, 'Rafid Nahiyan', 'Farabi', '01771089194', 'farabi@gmail.com', 'Student', 'O+', '2002-02-02', 'Male', '531/A West Shewrapara', '', NULL, 'Dhaka', 'Dhaka', 'Banani', '1669277568268.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `add_blood_requst`
--
ALTER TABLE `add_blood_requst`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `my_donation`
--
ALTER TABLE `my_donation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `users_image`
--
ALTER TABLE `users_image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `add_blood_requst`
--
ALTER TABLE `add_blood_requst`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `my_donation`
--
ALTER TABLE `my_donation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `users_image`
--
ALTER TABLE `users_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
