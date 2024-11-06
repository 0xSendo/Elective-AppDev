package com.Pentaforce.IntelliHealth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Pentaforce.IntelliHealth.entity.CommunityEntity;
import com.Pentaforce.IntelliHealth.repository.CommunityRepository;

import java.util.List;

@Service
public class CommunityService {

    private final CommunityRepository communityRepository;

    @Autowired
    public CommunityService(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository;
    }

    public CommunityEntity createCommunity(CommunityEntity community) {
        return communityRepository.save(community);
    }

    public CommunityEntity getCommunityById(int id) {
        return communityRepository.findById(id).orElse(null);
    }

    public List<CommunityEntity> getAllCommunities() {
        return communityRepository.findAll();
    }

    public CommunityEntity updateCommunity(int id, CommunityEntity community) {
        CommunityEntity existingCommunity = getCommunityById(id);
        if (existingCommunity != null) {
            existingCommunity.setName(community.getName());
            existingCommunity.setDescription(community.getDescription());
            return communityRepository.save(existingCommunity);
        }
        return null;
    }

    public boolean deleteCommunity(int id) {
        if (communityRepository.existsById(id)) {
            communityRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public CommunityEntity save(CommunityEntity communityEntity) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }
}
