package com.grandstay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grandstay.entity.ContactQuery;

@Repository
public interface QueryRepository extends JpaRepository<ContactQuery, Integer> {
}