package com.academy.edge.studentmanager.repositories;

import com.academy.edge.studentmanager.models.Invitation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvitationRepository extends CrudRepository<Invitation, String> {
    Invitation findByCodeAndEmail(String invitationId, String email);
}
